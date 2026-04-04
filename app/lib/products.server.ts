import { API_BASE_URL, categories as storefrontCategories } from "./products";
import {
  resolveStorefrontSlug,
  resolveStorefrontSlugByValue,
  storefrontCategoryProductSlugs,
} from "./storefrontRoutes";
import type { Category, Product, ResponsiveImageSet } from "../type";

const REQUEST_TIMEOUT_MS = 5000;
const CATEGORY_REQUEST_TIMEOUT_MS = 10000;

const normalizeImageSet = (
  value?: Partial<ResponsiveImageSet>,
): ResponsiveImageSet => ({
  mobile: value?.mobile ?? "",
  tablet: value?.tablet ?? "",
  desktop: value?.desktop ?? "",
});

const normalizeCategory = (value: unknown): Category => {
  const raw = typeof value === "string" ? value.trim().toLowerCase() : "";

  if (raw === "headphone" || raw === "headphones") {
    return "headphones";
  }

  if (raw === "speaker" || raw === "speakers") {
    return "speakers";
  }

  if (raw === "earphone" || raw === "earphones") {
    return "earphones";
  }

  return "headphones";
};

const categoryLabelFor = (category: Category) =>
  storefrontCategories.find((item) => item.slug === category)?.label ??
  category.charAt(0).toUpperCase() + category.slice(1);

const normalizeProduct = (product: Partial<Product> & Record<string, unknown>): Product => ({
  slug: product.slug ?? "",
  category: normalizeCategory(product.category),
  categoryLabel:
    typeof product.categoryLabel === "string" && product.categoryLabel.trim()
      ? product.categoryLabel
      : categoryLabelFor(normalizeCategory(product.category)),
  shortName: product.shortName ?? "",
  name: product.name ?? "",
  isNew: product.isNew ?? false,
  price: Number(product.price ?? 0),
  description: product.description ?? "",
  features: Array.isArray(product.features) ? (product.features as string[]) : [],
  includes: Array.isArray(product.includes)
    ? (product.includes as Product["includes"])
    : [],
  categoryImage: normalizeImageSet(product.categoryImage as Partial<ResponsiveImageSet>),
  productImage: normalizeImageSet(product.productImage as Partial<ResponsiveImageSet>),
  gallery: {
    first: normalizeImageSet(product.gallery?.first as Partial<ResponsiveImageSet>),
    second: normalizeImageSet(product.gallery?.second as Partial<ResponsiveImageSet>),
    third: normalizeImageSet(product.gallery?.third as Partial<ResponsiveImageSet>),
  },
  others: Array.isArray(product.others)
    ? (product.others as Product["others"])
    : [],
  categoryOrder: Number(product.categoryOrder ?? 0),
});

const fetchJson = async <T,>(
  path: string,
  timeoutMs = REQUEST_TIMEOUT_MS,
  init?: RequestInit,
): Promise<T> => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  const requestInit = init ?? {};

  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      ...requestInit,
      cache: "no-store",
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new Error(`Request failed for ${path}`);
    }

    return (await res.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
};

const tryFetchProduct = async (paths: string[], timeoutMs = REQUEST_TIMEOUT_MS) => {
  const settled = await Promise.allSettled(
    paths.map(async (path) => {
      const data = await fetchJson<unknown>(path, timeoutMs);

      if (!data || typeof data !== "object" || !("product" in data)) {
        return null;
      }

      return normalizeProduct(
        (data as { product: Partial<Product> & Record<string, unknown> }).product,
      );
    }),
  );

  for (const result of settled) {
    if (result.status === "fulfilled" && result.value) {
      return result.value;
    }
  }

  return null;
};

const extractProductRecords = (data: unknown): Array<Partial<Product> & Record<string, unknown>> => {
  if (Array.isArray(data)) {
    return data as Array<Partial<Product> & Record<string, unknown>>;
  }

  if (!data || typeof data !== "object") {
    return [];
  }

  if ("products" in data && Array.isArray((data as { products: unknown[] }).products)) {
    return (data as { products: Array<Partial<Product> & Record<string, unknown>> }).products;
  }

  if ("product" in data && (data as { product?: unknown }).product) {
    return [(data as { product: Partial<Product> & Record<string, unknown> }).product];
  }

  return [];
};

const fetchProductByCategoryAndSlug = async (
  category: Category,
  slug: string,
): Promise<Product | null> => {
  const canonicalSlug = resolveStorefrontSlug(category, slug);
  const product = await tryFetchProduct(
    [
      `/products/${category}/${canonicalSlug}`,
      `/product/${category}/${canonicalSlug}`,
      `/products/${canonicalSlug}`,
      `/product/${canonicalSlug}`,
    ],
    REQUEST_TIMEOUT_MS,
  );

  if (
    product &&
    product.category === category &&
    (product.slug === canonicalSlug || product.slug === slug)
  ) {
    return product;
  }

  return null;
};

const fetchBackendCategoryProducts = async (category: Category): Promise<Product[]> => {
  const settled = await Promise.allSettled(
    [
      `/products/category/${category}`,
      `/product/category/${category}`,
    ].map(async (path) => {
      const data = await fetchJson<unknown>(path, CATEGORY_REQUEST_TIMEOUT_MS);
      return extractProductRecords(data);
    }),
  );

  const merged = new Map<string, Product>();

  for (const result of settled) {
    if (result.status !== "fulfilled") {
      continue;
    }

    for (const item of result.value) {
      const product = normalizeProduct(item);

      if (product.category !== category || !product.slug) {
        continue;
      }

      merged.set(product.slug, product);
    }
  }

  return Array.from(merged.values()).sort((a, b) => a.categoryOrder - b.categoryOrder);
};

const fetchBackendCatalogProducts = async (): Promise<Product[]> => {
  const settled = await Promise.allSettled(
    [
      `/products`,
      `/product`,
    ].map(async (path) => {
      const data = await fetchJson<unknown>(path, CATEGORY_REQUEST_TIMEOUT_MS);
      return extractProductRecords(data);
    }),
  );

  const merged = new Map<string, Product>();

  for (const result of settled) {
    if (result.status !== "fulfilled") {
      continue;
    }

    for (const item of result.value) {
      const product = normalizeProduct(item);

      if (!product.slug) {
        continue;
      }

      merged.set(product.slug, product);
    }
  }

  return Array.from(merged.values()).sort((a, b) => a.categoryOrder - b.categoryOrder);
};

const fetchFallbackCategoryProducts = async (
  category: Category,
): Promise<Product[]> => {
  const slugs = storefrontCategoryProductSlugs[category] ?? [];
  const settled = await Promise.allSettled(
    slugs.map((slug) => fetchProductByCategoryAndSlug(category, slug)),
  );

  const merged = new Map<string, Product>();

  for (const result of settled) {
    if (result.status !== "fulfilled" || !result.value) {
      continue;
    }

    merged.set(result.value.slug, result.value);
  }

  return Array.from(merged.values()).sort((a, b) => a.categoryOrder - b.categoryOrder);
};

export const getCategoryProducts = async (
  category: string,
): Promise<Product[]> => {
  const normalizedCategory = normalizeCategory(category);
  const [catalogProducts, backendProducts] = await Promise.all([
    fetchBackendCatalogProducts(),
    fetchBackendCategoryProducts(normalizedCategory),
  ]);

  const merged = new Map<string, Product>();

  for (const product of catalogProducts) {
    if (product.category !== normalizedCategory) {
      continue;
    }

    merged.set(product.slug, product);
  }

  for (const product of backendProducts) {
    if (product.category !== normalizedCategory) {
      continue;
    }

    merged.set(product.slug, product);
  }

  if (merged.size > 0) {
    return Array.from(merged.values()).sort((a, b) => a.categoryOrder - b.categoryOrder);
  }

  return fetchFallbackCategoryProducts(normalizedCategory);
};

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  const canonicalSlug = resolveStorefrontSlugByValue(slug);

  return tryFetchProduct([
    `/products/${canonicalSlug}`,
    `/product/${canonicalSlug}`,
  ]);
};

export const getProduct = async (
  category: string,
  slug: string,
): Promise<Product | null> => {
  const normalizedCategory = normalizeCategory(category);
  const product = await fetchProductByCategoryAndSlug(normalizedCategory, slug);

  if (product) {
    return product;
  }

  const categoryProducts = await getCategoryProducts(normalizedCategory);
  return categoryProducts.find((item) => item.slug === resolveStorefrontSlug(normalizedCategory, slug)) ?? null;
};

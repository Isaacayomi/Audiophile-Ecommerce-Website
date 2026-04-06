import { API_BASE_URL, categories as storefrontCategories } from "./products";
import {
  resolveStorefrontSlug,
  resolveStorefrontSlugByValue,
} from "./storefrontRoutes";
import {
  getStorefrontCatalogSnapshot,
  getStorefrontCategorySnapshot,
  getStorefrontProductSnapshot,
  replaceStorefrontCatalogCache,
  upsertStorefrontCatalogProduct,
} from "./storefrontCatalogCache";
import type { Category, Product, ResponsiveImageSet } from "../type";

const REQUEST_TIMEOUT_MS = 15000;
const CATALOG_REQUEST_TIMEOUT_MS = 30000;

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

const overlayCachedUploadImage = (product: Product): Product => {
  const cachedProduct = getStorefrontProductSnapshot(product.slug);
  const cachedImage = cachedProduct?.image?.trim() ?? "";

  if (cachedImage.startsWith("data:")) {
    return {
      ...product,
      image: cachedImage,
    };
  }

  return product;
};

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
  image:
    typeof product.image === "string" && product.image.trim()
      ? product.image
      : undefined,
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

const mergeProducts = (...groups: Product[][]) => {
  const merged = new Map<string, Product>();

  for (const group of groups) {
    for (const product of group) {
      if (!product.slug) {
        continue;
      }

      merged.set(product.slug, product);
    }
  }

  return Array.from(merged.values()).sort((a, b) => a.categoryOrder - b.categoryOrder);
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
    return overlayCachedUploadImage(product);
  }

  return null;
};

const fetchBackendCatalogProducts = async (): Promise<Product[]> => {
  const settled = await Promise.allSettled(
    ["/products", "/product"].map(async (path) => {
      const data = await fetchJson<unknown>(path, CATALOG_REQUEST_TIMEOUT_MS);
      return extractProductRecords(data);
    }),
  );

  const merged = new Map<string, Product>();

  for (const result of settled) {
    if (result.status !== "fulfilled") {
      continue;
    }

    for (const item of result.value) {
      const product = overlayCachedUploadImage(normalizeProduct(item));

      if (!product.slug) {
        continue;
      }

      merged.set(product.slug, product);
    }
  }

  return Array.from(merged.values()).sort((a, b) => a.categoryOrder - b.categoryOrder);
};

export const getCategoryProducts = async (
  category: string,
): Promise<Product[]> => {
  const normalizedCategory = normalizeCategory(category);

  try {
    const backendProducts = await fetchBackendCatalogProducts();
    const merged = mergeProducts(
      getStorefrontCatalogSnapshot(),
      backendProducts,
    );

    if (merged.length > 0) {
      replaceStorefrontCatalogCache(merged);
      return merged.filter((product) => product.category === normalizedCategory);
    }
  } catch {
    // Fall through to the cached snapshot below.
  }

  return getStorefrontCategorySnapshot(normalizedCategory);
};

export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  const canonicalSlug = resolveStorefrontSlugByValue(slug);
  const product = await tryFetchProduct([
    `/products/${canonicalSlug}`,
    `/product/${canonicalSlug}`,
  ]);

  if (product) {
    const mergedProduct = overlayCachedUploadImage(product);
    upsertStorefrontCatalogProduct(mergedProduct);
    return mergedProduct;
  }

  try {
    const backendProducts = await fetchBackendCatalogProducts();
    const merged = mergeProducts(
      getStorefrontCatalogSnapshot(),
      backendProducts,
    );

    if (merged.length > 0) {
      replaceStorefrontCatalogCache(merged);
      return merged.find((item) => item.slug === canonicalSlug) ?? null;
    }
  } catch {
    // Fall through to the null return below.
  }

  return getStorefrontProductSnapshot(slug);
};

export const getProduct = async (
  category: string,
  slug: string,
): Promise<Product | null> => {
  const normalizedCategory = normalizeCategory(category);

  const product = await fetchProductByCategoryAndSlug(normalizedCategory, slug);

  if (product) {
    upsertStorefrontCatalogProduct(product);
    return product;
  }

  const categoryProductsFromBackend = await getCategoryProducts(normalizedCategory);
  const cachedMatch =
    categoryProductsFromBackend.find(
      (item) => item.slug === resolveStorefrontSlug(normalizedCategory, slug),
    ) ?? null;

  if (cachedMatch) {
    return cachedMatch;
  }

  return (
    getStorefrontCategorySnapshot(normalizedCategory).find(
      (item) => item.slug === resolveStorefrontSlug(normalizedCategory, slug),
    ) ?? null
  );
};

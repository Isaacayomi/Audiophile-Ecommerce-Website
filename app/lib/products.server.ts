import { API_BASE_URL } from "./products";
import type { Category, Product, ResponsiveImageSet } from "../type";

const normalizeImageSet = (
  value?: Partial<ResponsiveImageSet>,
): ResponsiveImageSet => ({
  mobile: value?.mobile ?? "",
  tablet: value?.tablet ?? "",
  desktop: value?.desktop ?? "",
});

const normalizeProduct = (product: Partial<Product> & Record<string, unknown>): Product => ({
  slug: product.slug ?? "",
  category: (product.category as Category | undefined) ?? "headphones",
  categoryLabel: product.categoryLabel ?? "",
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

const fetchJson = async <T,>(path: string): Promise<T> => {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Request failed for ${path}`);
  }

  return (await res.json()) as T;
};

export const getCategoryProducts = async (
  category: string,
): Promise<Product[]> => {
  const data = await fetchJson<unknown>(`/products/category/${category}`);

  if (!Array.isArray(data)) {
    throw new Error("Unexpected category response shape");
  }

  return data
    .map((item) =>
      normalizeProduct(item as Partial<Product> & Record<string, unknown>),
    )
    .filter((product) => product.category === category)
    .sort((a, b) => a.categoryOrder - b.categoryOrder);
};

export const getProductBySlug = async (slug: string): Promise<Product> => {
  const data = await fetchJson<unknown>(`/product/${slug}`);

  if (!data || typeof data !== "object" || !("product" in data)) {
    throw new Error("Unexpected product response shape");
  }

  return normalizeProduct(
    (data as { product: Partial<Product> & Record<string, unknown> }).product,
  );
};

export const getProduct = async (
  category: string,
  slug: string,
): Promise<Product> => {
  const data = await fetchJson<unknown>(`/product/${category}/${slug}`);

  if (!data || typeof data !== "object" || !("product" in data)) {
    throw new Error("Unexpected product response shape");
  }

  return normalizeProduct(
    (data as { product: Partial<Product> & Record<string, unknown> }).product,
  );
};

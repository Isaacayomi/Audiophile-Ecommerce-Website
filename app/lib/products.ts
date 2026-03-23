import { Category, Product, ResponsiveImageSet } from "../type";

export const categories: Array<{ slug: Category; label: string }> = [
  { slug: "headphones", label: "Headphones" },
  { slug: "speakers", label: "Speakers" },
  { slug: "earphones", label: "Earphones" },
];

// The frontend talks to the FastAPI backend for product data.
// In production we can point this to another API with an environment variable,
// but during local development it falls back to the backend running on port 8000.
export const API_BASE_URL =
  // process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://audiophille-database-3.onrender.com";

// Some API responses may miss one or more image sizes.
// This helper guarantees that every image object has `mobile`, `tablet`,
// and `desktop` keys so the UI does not need defensive checks everywhere.
const normalizeImageSet = (
  value?: Partial<ResponsiveImageSet>,
): ResponsiveImageSet => ({
  mobile: value?.mobile ?? "",
  tablet: value?.tablet ?? "",
  desktop: value?.desktop ?? "",
});

// The category endpoints and product-detail endpoints do not always return
// exactly the same amount of information. We normalize both into one shared
// `Product` shape here so the components can work with a single predictable model
const normalizeProduct = (product: Partial<Product>): Product => ({
  slug: product.slug ?? "",
  category: (product.category as Category | undefined) ?? "headphones",
  categoryLabel: product.categoryLabel ?? "",
  shortName: product.shortName ?? "",
  name: product.name ?? "",
  isNew: product.isNew ?? false,
  price: product.price ?? 0,
  description: product.description ?? "",
  features: product.features ?? [],
  includes: product.includes ?? [],
  categoryImage: normalizeImageSet(product.categoryImage),
  productImage: normalizeImageSet(product.productImage),
  gallery: {
    first: normalizeImageSet(product.gallery?.first),
    second: normalizeImageSet(product.gallery?.second),
    third: normalizeImageSet(product.gallery?.third),
  },
  others:
    product.others?.map((other) => ({
      slug: other.slug,
      category: other.category,
      name: other.name,
      image: normalizeImageSet(other.image),
    })) ?? [],
  categoryOrder: product.categoryOrder ?? 0,
});

// `GET /products/category/:category` returns a plain array from FastAPI.
// We validate that shape, convert each item into our normalized `Product` type,
// then keep only the products that actually belong to the requested category.
// That extra filter protects the frontend if the backend ever returns mixed data.
const parseCategoryProducts = (data: unknown, category: string): Product[] => {
  if (!Array.isArray(data)) {
    throw new Error("Unexpected category response shape");
  }

  return data
    .map((product) => normalizeProduct(product as Partial<Product>))
    .filter((product) => product.category === category)
    .sort((a, b) => a.categoryOrder - b.categoryOrder);
};

// The detail endpoints return an object shaped like `{ product: {...} }`.
// This helper unwraps that response and normalizes it before the page uses it.
const parseProductResponse = (data: unknown): Product => {
  if (!data || typeof data !== "object" || !("product" in data)) {
    throw new Error("Unexpected product response shape");
  }

  return normalizeProduct((data as { product: Partial<Product> }).product);
};

// All product requests go through one fetch helper so they share the same
// cache behavior and fail in a consistent way when the backend is unavailable.
const fetchJson = async <T>(path: string): Promise<T> => {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Request failed for ${path}`);
  }

  return res.json() as Promise<T>;
};

export const getCategoryProducts = async (
  category: string,
): Promise<Product[]> => {
  // Used by category landing pages such as `/headphones` or `/speakers`.
  // These pages need the lighter "card/list" version of each product.
  const data = await fetchJson<unknown>(`/products/category/${category}`);
  return parseCategoryProducts(data, category);
};

export const getProductBySlug = async (slug: string): Promise<Product> => {
  // Useful in places where we only know a product slug and do not yet know
  // which category route it belongs to.
  const data = await fetchJson<unknown>(`/product/${slug}`);
  return parseProductResponse(data);
};

export const getProduct = async (
  category: string,
  slug: string,
): Promise<Product> => {
  // This is the main lookup used by product detail pages.
  // Passing both category and slug makes the request match the route structure
  // used by the App Router, for example `/headphones/xx99-mark-two-headphones`.
  const data = await fetchJson<unknown>(`/product/${category}/${slug}`);
  return parseProductResponse(data);
};

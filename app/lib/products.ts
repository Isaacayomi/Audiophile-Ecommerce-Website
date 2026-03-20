export type Category = "headphones" | "speakers" | "earphones";

export interface ResponsiveImageSet {
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface ProductInclude {
  quantity: number;
  item: string;
}

export interface Product {
  slug: string;
  category: Category;
  categoryLabel: string;
  shortName: string;
  name: string;
  isNew?: boolean;
  price: number;
  description: string;
  features: string[];
  includes: ProductInclude[];
  categoryImage: ResponsiveImageSet;
  productImage: ResponsiveImageSet;
  gallery: {
    first: ResponsiveImageSet;
    second: ResponsiveImageSet;
    third: ResponsiveImageSet;
  };
  others: Array<{
    slug: string;
    category: Category;
    name: string;
    image: ResponsiveImageSet;
  }>;
  categoryOrder: number;
}

export const categories: Array<{ slug: Category; label: string }> = [
  { slug: "headphones", label: "Headphones" },
  { slug: "speakers", label: "Speakers" },
  { slug: "earphones", label: "Earphones" },
];

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

const emptyImageSet = (): ResponsiveImageSet => ({
  mobile: "",
  tablet: "",
  desktop: "",
});

const normalizeImageSet = (
  value?: Partial<ResponsiveImageSet>,
): ResponsiveImageSet => ({
  mobile: value?.mobile ?? "",
  tablet: value?.tablet ?? "",
  desktop: value?.desktop ?? "",
});

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

const parseCategoryProducts = (
  data: unknown,
  category: string,
): Product[] => {
  if (!Array.isArray(data)) {
    throw new Error("Unexpected category response shape");
  }

  return data
    .map((product) => normalizeProduct(product as Partial<Product>))
    .filter((product) => product.category === category)
    .sort((a, b) => a.categoryOrder - b.categoryOrder);
};

const parseProductResponse = (data: unknown): Product => {
  if (!data || typeof data !== "object" || !("product" in data)) {
    throw new Error("Unexpected product response shape");
  }

  return normalizeProduct((data as { product: Partial<Product> }).product);
};

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
  const data = await fetchJson<unknown>(`/products/category/${category}`);
  return parseCategoryProducts(data, category);
};

export const getProductBySlug = async (slug: string): Promise<Product> => {
  const data = await fetchJson<unknown>(`/product/${slug}`);
  return parseProductResponse(data);
};

export const getProduct = async (
  category: string,
  slug: string,
): Promise<Product> => {
  const data = await fetchJson<unknown>(`/product/${category}/${slug}`);
  return parseProductResponse(data);
};

export { emptyImageSet };

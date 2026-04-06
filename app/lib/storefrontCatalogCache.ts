import "server-only";

import { resolveStorefrontSlugByValue } from "./storefrontRoutes";
import type { Category, Product } from "../type";

type StorefrontCatalogCacheState = {
  products: Product[];
  removedSlugs: Set<string>;
  hydrated: boolean;
  updatedAt: number;
};

const globalCache = globalThis as typeof globalThis & {
  __audiophileStorefrontCatalogCache?: StorefrontCatalogCacheState;
};

const cache =
  globalCache.__audiophileStorefrontCatalogCache ??
  ({
    products: [],
    removedSlugs: new Set<string>(),
    hydrated: false,
    updatedAt: Date.now(),
  } satisfies StorefrontCatalogCacheState);

globalCache.__audiophileStorefrontCatalogCache = cache;

const sortProducts = (products: Product[]) =>
  products
    .slice()
    .sort(
      (a, b) =>
        a.categoryOrder - b.categoryOrder || a.name.localeCompare(b.name),
    );

const normalizeSlug = (slug: string) => resolveStorefrontSlugByValue(slug);

export const isStorefrontProductRemoved = (slug: string) => {
  const canonicalSlug = normalizeSlug(slug);

  return (
    cache.removedSlugs.has(slug) || cache.removedSlugs.has(canonicalSlug)
  );
};

const dedupeProducts = (products: Product[]) => {
  const merged = new Map<string, Product>();

  for (const product of products) {
    if (!product.slug || isStorefrontProductRemoved(product.slug)) {
      continue;
    }

    merged.set(product.slug, product);
  }

  return sortProducts(Array.from(merged.values()));
};

export const isStorefrontCatalogHydrated = () => cache.hydrated;

export const getStorefrontCatalogSnapshot = () =>
  sortProducts(cache.products.filter((product) => !isStorefrontProductRemoved(product.slug)));

export const getStorefrontCategorySnapshot = (category: Category) =>
  sortProducts(
    cache.products.filter(
      (product) =>
        product.category === category &&
        !isStorefrontProductRemoved(product.slug),
    ),
  );

export const getStorefrontProductSnapshot = (slug: string) => {
  const canonicalSlug = resolveStorefrontSlugByValue(slug);

  if (isStorefrontProductRemoved(canonicalSlug)) {
    return null;
  }

  return (
    cache.products.find((product) => product.slug === canonicalSlug) ??
    cache.products.find((product) => product.slug === slug) ??
    null
  );
};

export const replaceStorefrontCatalogCache = (products: Product[]) => {
  cache.products = dedupeProducts(products);
  cache.hydrated = true;
  cache.updatedAt = Date.now();
};

export const upsertStorefrontCatalogProduct = (product: Product) => {
  const canonicalSlug = resolveStorefrontSlugByValue(product.slug);
  cache.removedSlugs.delete(product.slug);
  cache.removedSlugs.delete(canonicalSlug);
  cache.products = dedupeProducts([
    product,
    ...cache.products.filter((item) => item.slug !== product.slug),
  ]);
  cache.hydrated = true;
  cache.updatedAt = Date.now();
};

export const removeStorefrontCatalogProduct = (slug: string) => {
  const canonicalSlug = resolveStorefrontSlugByValue(slug);

  cache.removedSlugs.add(slug);
  cache.removedSlugs.add(canonicalSlug);

  cache.products = cache.products.filter(
    (product) => product.slug !== canonicalSlug && product.slug !== slug,
  );
  cache.hydrated = true;
  cache.updatedAt = Date.now();
};

"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { QueryClient } from "@tanstack/react-query";
import type { AdminProduct } from "../../type";
import { API_BASE_URL } from "../../lib/products";
import {
  mapStorefrontProductToAdmin,
  stampAdminProduct,
} from "../_lib/catalog";

const apiJson = async <T,>(path: string, init?: RequestInit): Promise<T> => {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return (await res.json()) as T;
};

const fetchWithTimeout = async <T,>(
  task: () => Promise<T>,
  timeoutMs = 30000,
) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  try {
    return await Promise.race([
      task(),
      new Promise<T>((_, reject) => {
        timeoutId = setTimeout(() => {
          reject(new Error("Request timed out"));
        }, timeoutMs);
      }),
    ]);
  } finally {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
  }
};

const extractProductRecords = (data: unknown): unknown[] => {
  if (Array.isArray(data)) {
    return data;
  }

  if (!data || typeof data !== "object") {
    return [];
  }

  if ("products" in data && Array.isArray((data as { products: unknown[] }).products)) {
    return (data as { products: unknown[] }).products;
  }

  if ("product" in data && (data as { product?: unknown }).product) {
    return [(data as { product: unknown }).product];
  }

  return [];
};

const normalizeRemoteProduct = (item: unknown): AdminProduct | null => {
  if (!item || typeof item !== "object" || !("slug" in item)) {
    return null;
  }

  const record = item as Partial<AdminProduct> & Record<string, unknown>;

  if (
    "stock" in record ||
    "status" in record ||
    "storefrontPath" in record ||
    "updatedAt" in record
  ) {
    return stampAdminProduct(record as AdminProduct);
  }

  return stampAdminProduct(mapStorefrontProductToAdmin(item as never));
};

const loadProductsFromCatalogEndpoint = async (path: string) => {
  const data = await fetchWithTimeout(() => apiJson<unknown>(path));
  return extractProductRecords(data)
    .map((item) => normalizeRemoteProduct(item))
    .filter((product): product is AdminProduct => Boolean(product));
};

const buildRemoteProductPayload = (product: AdminProduct) => {
  const storefrontPath =
    product.storefrontPath || `/${product.category}/${product.slug}`;
  const isNew = Boolean(product.isNew ?? product.status === "Live");

  return {
    ...product,
    short_name: product.shortName,
    category_label: product.categoryLabel,
    storefront_path: storefrontPath,
    category_order: product.categoryOrder,
    is_new: isNew,
    updated_at: product.updatedAt,
    categoryImage: product.categoryImage,
    category_image: product.categoryImage,
    productImage: product.productImage,
    product_image: product.productImage,
  };
};

const normalizeWrittenProduct = (
  response: unknown,
  fallback: AdminProduct,
): AdminProduct => {
  if (!response || typeof response !== "object") {
    return stampAdminProduct(fallback);
  }

  const record =
    "product" in response && (response as { product?: unknown }).product
      ? (response as { product: Partial<AdminProduct> }).product
      : "record" in response && (response as { record?: unknown }).record
        ? (response as { record: Partial<AdminProduct> }).record
        : response;

  if (!record || typeof record !== "object") {
    return stampAdminProduct(fallback);
  }

  return stampAdminProduct({
    ...fallback,
    ...(record as Partial<AdminProduct>),
  });
};

const loadRemoteProducts = async () => {
  const results = await Promise.allSettled([
    loadProductsFromCatalogEndpoint("/products"),
    loadProductsFromCatalogEndpoint("/product"),
  ]);

  const merged = new Map<string, AdminProduct>();

  for (const result of results) {
    if (result.status !== "fulfilled") {
      continue;
    }

    for (const product of result.value) {
      if (!product.slug) {
        continue;
      }

      if (!merged.has(product.slug)) {
        merged.set(product.slug, product);
      }
    }
  }

  const records = Array.from(merged.values());

  if (records.length === 0) {
    throw new Error("Unable to load remote catalog");
  }

  return records;
};

const syncRemoteProduct = async (
  product: AdminProduct,
  existingProducts: AdminProduct[],
) => {
  const cleanedSlug = product.slug;
  const method = existingProducts.some((item) => item.slug === cleanedSlug)
    ? "PUT"
    : "POST";
  const endpoints =
    method === "POST"
      ? ["/products", "/product"]
      : [`/products/${cleanedSlug}`, `/product/${cleanedSlug}`];
  const payload = buildRemoteProductPayload(product);
  let lastError: Error | null = null;

  for (const endpoint of endpoints) {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    try {
      const data = await apiJson<unknown>(endpoint, {
        method,
        signal: controller.signal,
        body: JSON.stringify(payload),
      });

      return normalizeWrittenProduct(data, product);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Unable to save product");
    } finally {
      window.clearTimeout(timeout);
    }
  }

  throw lastError ?? new Error("Unable to save product");
};

const deleteRemoteProduct = async (slug: string) => {
  const endpoints = [`/products/${slug}`, `/product/${slug}`];
  let lastError: Error | null = null;

  for (const endpoint of endpoints) {
    try {
      const data = await apiJson<{ deleted?: boolean }>(endpoint, {
        method: "DELETE",
      });

      if (data.deleted === false) {
        throw new Error("Remote delete was not confirmed");
      }

      return slug;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Unable to delete product");
    }
  }

  throw lastError ?? new Error("Unable to delete product");
};

const invalidateRemoteCatalog = (queryClient: QueryClient) =>
  queryClient.invalidateQueries({
    queryKey: ["admin-catalog", "remote-products"],
  });

type UseAdminCatalogQueriesOptions = {
  enabled: boolean;
  onRemoteProductUpsert?: (product: AdminProduct) => void;
};

type SyncCatalogOptions = {
  waitForSlug?: string;
  timeoutMs?: number;
  intervalMs?: number;
};

export function useAdminCatalogQueries({
  enabled,
  onRemoteProductUpsert,
}: UseAdminCatalogQueriesOptions) {
  const queryClient = useQueryClient();

  const remoteProductsQuery = useQuery<AdminProduct[], Error>({
    queryKey: ["admin-catalog", "remote-products"],
    queryFn: loadRemoteProducts,
    enabled,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  const upsertRemoteProduct = useMutation({
    mutationFn: async ({
      product,
      existingProducts,
    }: {
      product: AdminProduct;
      existingProducts: AdminProduct[];
    }) => syncRemoteProduct(product, existingProducts),
    onSuccess: async (remoteRecord) => {
      if (remoteRecord && onRemoteProductUpsert) {
        onRemoteProductUpsert(remoteRecord);
      }

      await invalidateRemoteCatalog(queryClient);
    },
  });

  const deleteRemoteProductMutation = useMutation({
    mutationFn: deleteRemoteProduct,
    onSuccess: async () => {
      await invalidateRemoteCatalog(queryClient);
    },
  });

  const sleep = (ms: number) =>
    new Promise<void>((resolve) => {
      window.setTimeout(resolve, ms);
    });

  const syncCatalog = async (options?: SyncCatalogOptions) => {
    if (!options?.waitForSlug) {
      const result = await remoteProductsQuery.refetch();

      if (result.error) {
        throw result.error;
      }

      return result.data ?? [];
    }

    const timeoutMs = options?.timeoutMs ?? 15000;
    const intervalMs = options?.intervalMs ?? 1500;
    const deadline = Date.now() + timeoutMs;
    let lastError: Error | null = null;

    while (Date.now() <= deadline) {
      try {
        const result = await remoteProductsQuery.refetch();

        if (result.error) {
          lastError = result.error;
        } else {
          lastError = null;
          const products = result.data ?? [];

          if (
            !options?.waitForSlug ||
            products.some((product) => product.slug === options.waitForSlug)
          ) {
            return products;
          }
        }
      } catch (error) {
        lastError = error instanceof Error ? error : new Error("Unable to refresh catalog");
      }

      if (Date.now() > deadline) {
        break;
      }

      await sleep(intervalMs);
    }

    if (lastError) {
      throw lastError;
    }

    throw new Error(
      options?.waitForSlug
        ? "Published product did not sync in time"
        : "Unable to refresh catalog",
    );
  };

  return {
    remoteProductsQuery,
    syncCatalog,
    upsertRemoteProduct: upsertRemoteProduct.mutateAsync,
    deleteRemoteProduct: deleteRemoteProductMutation.mutateAsync,
  };
}

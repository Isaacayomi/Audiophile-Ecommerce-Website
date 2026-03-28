"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  ADMIN_CATALOG_STORAGE_KEY,
  ADMIN_SETTINGS_STORAGE_KEY,
  AdminOrder,
  AdminProduct,
  AdminSettings,
  defaultSettings,
  fallbackOrders,
  fallbackProducts,
  mapStorefrontProductToAdmin,
  makeStorefrontPath,
  normalizeAdminProducts,
  slugify,
  toCatalogInput,
} from "../_lib/catalog";
import { API_BASE_URL, categories as storefrontCategories } from "../../lib/products";
import type { CatalogInput } from "../../lib/catalog-types";

type AdminCatalogContextValue = {
  products: AdminProduct[];
  orders: AdminOrder[];
  settings: AdminSettings;
  isHydrated: boolean;
  isSyncing: boolean;
  lastSyncedAt: string | null;
  syncCatalog: () => Promise<void>;
  upsertProduct: (product: CatalogInput) => Promise<boolean>;
  duplicateProduct: (slug: string) => Promise<void>;
  deleteProduct: (slug: string) => Promise<void>;
  saveSettings: (settings: Partial<AdminSettings>) => void;
  getProductBySlug: (slug: string) => AdminProduct | undefined;
};

const AdminCatalogContext = createContext<AdminCatalogContextValue | null>(null);

const readStorage = <T,>(key: string): T | null => {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(key);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
};

const writeStorage = (key: string, value: unknown) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

const apiJson = async <T,>(
  path: string,
  init?: RequestInit,
): Promise<T> => {
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

const loadRemoteProducts = async () => {
  try {
    const data = await apiJson<{ products: AdminProduct[] }>("/products");

    if (Array.isArray(data.products)) {
      return data.products;
    }
  } catch {
    // Fall through to the category-based loader below.
  }

  const results = await Promise.allSettled(
    storefrontCategories.map(async ({ slug }) => {
      const data = await apiJson<unknown>(`/products/category/${slug}`);
      return Array.isArray(data) ? data : [];
    }),
  );

  return results
    .flatMap((result) => (result.status === "fulfilled" ? result.value : []))
    .map((item) => mapStorefrontProductToAdmin(item as never));
};

const normalizeCopySlug = (current: AdminProduct[], baseSlug: string) => {
  let nextSlug = `${baseSlug}-copy`;
  let suffix = 2;

  while (current.some((product) => product.slug === nextSlug)) {
    nextSlug = `${baseSlug}-copy-${suffix}`;
    suffix += 1;
  }

  return nextSlug;
};

export function AdminCatalogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [products, setProducts] = useState<AdminProduct[]>(fallbackProducts);
  const [orders] = useState<AdminOrder[]>(fallbackOrders);
  const [settings, setSettings] = useState<AdminSettings>(defaultSettings);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);

  const applyRecords = (records: AdminProduct[]) => {
    setProducts(normalizeAdminProducts(records));
    setLastSyncedAt(new Date().toISOString());
  };

  const syncCatalog = async () => {
    setIsSyncing(true);

    try {
      // The API is the source of truth, so sync just refreshes from it.
      const records = await loadRemoteProducts();
      applyRecords(records.length ? records : fallbackProducts);
      toast.success("Catalog refreshed");
    } catch {
      toast.error("Catalog sync is unavailable right now");
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    const storedProducts = readStorage<AdminProduct[]>(ADMIN_CATALOG_STORAGE_KEY);
    const storedSettings = readStorage<AdminSettings>(ADMIN_SETTINGS_STORAGE_KEY);

    if (storedProducts?.length) {
      setProducts(normalizeAdminProducts(storedProducts));
    }

    if (storedSettings) {
      setSettings(storedSettings);
    }

    void (async () => {
      try {
        setIsSyncing(true);
        const records = await loadRemoteProducts();
        applyRecords(records.length ? records : fallbackProducts);
      } catch {
        if (!storedProducts?.length) {
          setProducts(normalizeAdminProducts(fallbackProducts));
        }
      } finally {
        setIsHydrated(true);
        setIsSyncing(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    writeStorage(ADMIN_CATALOG_STORAGE_KEY, products);
  }, [products, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    writeStorage(ADMIN_SETTINGS_STORAGE_KEY, settings);
  }, [settings, isHydrated]);

  const upsertProduct = async (product: CatalogInput) => {
    const cleanedSlug = product.slug || slugify(product.name);
    const payload: CatalogInput = {
      ...product,
      slug: cleanedSlug,
      storefrontPath: makeStorefrontPath(product.category, cleanedSlug, product.storefrontPath),
    };

    try {
      const method = products.some((item) => item.slug === cleanedSlug) ? "PUT" : "POST";
      const endpoint =
        method === "POST" ? "/products" : `/products/${cleanedSlug}`;
      const data = await apiJson<{ product: AdminProduct } | { record: AdminProduct }>(endpoint, {
        method,
        body: JSON.stringify(payload),
      });
      const record = "product" in data ? data.product : data.record;

      setProducts((current) => {
        const next = current.filter((item) => item.slug !== record.slug);
        next.unshift(record);
        return normalizeAdminProducts(next);
      });
      toast.success("Product saved");
      return true;
    } catch {
      toast.error("Unable to save product");
      return false;
    }
  };

  const duplicateProduct = async (slug: string) => {
    const source = products.find((product) => product.slug === slug);

    if (!source) {
      toast.error("Product not found");
      return;
    }

    const nextSlug = normalizeCopySlug(products, source.slug);

    await upsertProduct({
      ...toCatalogInput(source),
      slug: nextSlug,
      name: `${source.name} Copy`,
      shortName: `${source.shortName} Copy`,
      status: "Draft",
      featured: false,
      storefrontPath: `/${source.category}/${nextSlug}`,
    });
  };

  const deleteProduct = async (slug: string) => {
    try {
      const data = await apiJson<{ deleted: boolean }>(`/products/${slug}`, {
        method: "DELETE",
      });

      if (data.deleted) {
        setProducts((current) => current.filter((product) => product.slug !== slug));
        toast.success("Product removed");
      }
    } catch {
      toast.error("Unable to delete product");
    }
  };

  const saveSettings = (next: Partial<AdminSettings>) => {
    setSettings((current) => ({ ...current, ...next }));
    toast.success("Settings saved");
  };

  const getProductBySlug = (slug: string) =>
    products.find((product) => product.slug === slug);

  const value = useMemo(
    () => ({
      products,
      orders,
      settings,
      isHydrated,
      isSyncing,
      lastSyncedAt,
      syncCatalog,
      upsertProduct,
      duplicateProduct,
      deleteProduct,
      saveSettings,
      getProductBySlug,
    }),
    [products, orders, settings, isHydrated, isSyncing, lastSyncedAt],
  );

  return (
    <AdminCatalogContext.Provider value={value}>
      {children}
    </AdminCatalogContext.Provider>
  );
}

export const useAdminCatalog = () => {
  const context = useContext(AdminCatalogContext);

  if (!context) {
    throw new Error("useAdminCatalog must be used within AdminCatalogProvider");
  }

  return context;
};

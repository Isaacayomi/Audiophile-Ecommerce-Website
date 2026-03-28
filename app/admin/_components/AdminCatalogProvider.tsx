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
  loadStorefrontCatalog,
  normalizeAdminProducts,
  slugify,
  upsertAdminProduct,
} from "../_lib/catalog";

type AdminCatalogContextValue = {
  products: AdminProduct[];
  orders: AdminOrder[];
  settings: AdminSettings;
  isHydrated: boolean;
  isSyncing: boolean;
  lastSyncedAt: string | null;
  syncCatalog: () => Promise<void>;
  upsertProduct: (product: Omit<AdminProduct, "updatedAt">) => void;
  deleteProduct: (slug: string) => void;
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

  useEffect(() => {
    // We hydrate from localStorage first so the dashboard feels persistent
    // between visits, then fall back to the storefront API as the canonical seed.
    const storedProducts = readStorage<AdminProduct[]>(ADMIN_CATALOG_STORAGE_KEY);
    const storedSettings = readStorage<AdminSettings>(ADMIN_SETTINGS_STORAGE_KEY);

    if (storedProducts?.length) {
      setProducts(normalizeAdminProducts(storedProducts));
    }

    if (storedSettings) {
      setSettings(storedSettings);
    }

    const needsSeed = !storedProducts?.length;

    if (needsSeed) {
      void (async () => {
        try {
          setIsSyncing(true);
          const storefrontCatalog = await loadStorefrontCatalog();
          setProducts(normalizeAdminProducts(storefrontCatalog.length ? storefrontCatalog : fallbackProducts));
          setLastSyncedAt(new Date().toISOString());
          toast.success("Catalog synced from storefront");
        } catch {
          setProducts(normalizeAdminProducts(fallbackProducts));
        } finally {
          setIsSyncing(false);
          setIsHydrated(true);
        }
      })();
      return;
    }

    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    writeStorage(ADMIN_CATALOG_STORAGE_KEY, products);
  }, [products, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    writeStorage(ADMIN_SETTINGS_STORAGE_KEY, settings);
  }, [settings, isHydrated]);

  const syncCatalog = async () => {
    setIsSyncing(true);

    try {
      const storefrontCatalog = await loadStorefrontCatalog();
      setProducts((current) => {
        // We preserve local changes when possible, but refresh the product
        // names, slugs, categories, and imagery from the storefront source.
        const currentBySlug = new Map(current.map((product) => [product.slug, product]));

        const merged = storefrontCatalog.map((product) => {
          const existing = currentBySlug.get(product.slug);
          return {
            ...product,
            stock: existing?.stock ?? product.stock,
            status: existing?.status ?? product.status,
            featured: existing?.featured ?? product.featured,
            description: existing?.description ?? product.description,
            storefrontPath: existing?.storefrontPath ?? product.storefrontPath,
          };
        });

        return normalizeAdminProducts(merged.length ? merged : fallbackProducts);
      });

      setLastSyncedAt(new Date().toISOString());
      toast.success("Catalog refreshed from storefront");
    } catch {
      toast.error("Storefront sync is unavailable right now");
    } finally {
      setIsSyncing(false);
    }
  };

  const upsertProduct = (product: Omit<AdminProduct, "updatedAt">) => {
    const cleanedSlug = product.slug || slugify(product.name);
    const nextProduct = {
      ...product,
      slug: cleanedSlug,
      storefrontPath: product.storefrontPath || `/${product.category}/${cleanedSlug}`,
    };

    setProducts((current) =>
      upsertAdminProduct(current, {
        ...nextProduct,
        slug: cleanedSlug,
      }),
    );
    toast.success("Product saved");
  };

  const deleteProduct = (slug: string) => {
    setProducts((current) => current.filter((product) => product.slug !== slug));
    toast.success("Product removed");
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

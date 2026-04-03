"use client";

import React, { createContext, useContext, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import {
  ADMIN_CATALOG_STORAGE_KEY,
  ADMIN_SETTINGS_STORAGE_KEY,
  fallbackProducts,
  mapStorefrontProductToAdmin,
  makeStorefrontPath,
  slugify,
  stampAdminProduct,
  toCatalogInput,
} from "../_lib/catalog";
import { API_BASE_URL, categories as storefrontCategories } from "../../lib/products";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import {
  mergeAdminSettings,
  removeAdminProduct,
  setAdminHydrated,
  setAdminLastSyncedAt,
  setAdminProducts,
  setAdminSettings,
  setAdminSyncing,
  upsertAdminProduct,
} from "../../store/adminCatalog/adminCatalogSlice";
import type {
  AdminOrder,
  AdminProduct,
  AdminSettings,
  CatalogInput,
} from "../../type";

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
      return data.products.map((product) => stampAdminProduct(product));
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

const SAVE_TOAST_DELAY_MS = 3500;

const showSaveToast = (message: string) => {
  window.setTimeout(() => {
    toast.success(message);
  }, SAVE_TOAST_DELAY_MS);
};

const getFallbackTemplate = (category: CatalogInput["category"]) =>
  fallbackProducts.find((product) => product.category === category) ??
  fallbackProducts[0];

const buildLocalProductRecord = (
  product: CatalogInput,
  categoryLabel: string,
  existing?: AdminProduct,
): AdminProduct => {
  const template = existing ?? getFallbackTemplate(product.category);

  return {
    ...template,
    slug: product.slug,
    category: product.category,
    categoryLabel,
    shortName: product.shortName,
    name: product.name,
    price: product.price,
    description: product.description,
    stock: product.stock,
    status: product.status,
    featured: product.featured,
    image: product.image,
    storefrontPath: makeStorefrontPath(
      product.category,
      product.slug,
      product.storefrontPath,
    ),
    updatedAt: new Date().toISOString(),
  };
};

const syncRemoteProduct = async (
  product: CatalogInput,
  categoryLabel: string,
  existingProducts: AdminProduct[],
): Promise<AdminProduct | null> => {
  const cleanedSlug = product.slug || slugify(product.name);
  const payload: CatalogInput = {
    ...product,
    slug: cleanedSlug,
    storefrontPath: makeStorefrontPath(
      product.category,
      cleanedSlug,
      product.storefrontPath,
    ),
  };

  const method = existingProducts.some((item) => item.slug === cleanedSlug)
    ? "PUT"
    : "POST";
  const endpoint = method === "POST" ? "/products" : `/products/${cleanedSlug}`;
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 8000);

  try {
    const data = await apiJson<{ product: AdminProduct } | { record: AdminProduct }>(
      endpoint,
      {
        method,
        signal: controller.signal,
        body: JSON.stringify({
          ...payload,
          categoryLabel,
        }),
      },
    );

    return "product" in data ? data.product : data.record;
  } catch {
    return null;
  } finally {
    window.clearTimeout(timeout);
  }
};

export function AdminCatalogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.adminCatalog.products);
  const orders = useSelector((state: RootState) => state.adminCatalog.orders);
  const settings = useSelector((state: RootState) => state.adminCatalog.settings);
  const isHydrated = useSelector(
    (state: RootState) => state.adminCatalog.isHydrated,
  );
  const isSyncing = useSelector((state: RootState) => state.adminCatalog.isSyncing);
  const lastSyncedAt = useSelector(
    (state: RootState) => state.adminCatalog.lastSyncedAt,
  );

  const syncCatalog = async () => {
    dispatch(setAdminSyncing(true));

    try {
      // The API is the source of truth, so sync just refreshes from it.
      const records = await loadRemoteProducts();
      dispatch(setAdminProducts(records.length ? records : fallbackProducts));
      dispatch(setAdminLastSyncedAt(new Date().toISOString()));
      toast.success("Catalog refreshed");
    } catch {
      toast.error("Catalog sync is unavailable right now");
    } finally {
      dispatch(setAdminSyncing(false));
    }
  };

  useEffect(() => {
    const storedProducts = readStorage<AdminProduct[]>(ADMIN_CATALOG_STORAGE_KEY);
    const storedSettings = readStorage<AdminSettings>(ADMIN_SETTINGS_STORAGE_KEY);

    if (storedProducts?.length) {
      dispatch(setAdminProducts(storedProducts));
    }

    if (storedSettings) {
      dispatch(setAdminSettings(storedSettings));
    }

    void (async () => {
      try {
        dispatch(setAdminSyncing(true));
        const records = await loadRemoteProducts();
        dispatch(setAdminProducts(records.length ? records : fallbackProducts));
        dispatch(setAdminLastSyncedAt(new Date().toISOString()));
      } catch {
        if (!storedProducts?.length) {
          dispatch(setAdminProducts(fallbackProducts));
        }
      } finally {
        dispatch(setAdminHydrated(true));
        dispatch(setAdminSyncing(false));
      }
    })();
  }, [dispatch]);

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
    const categoryLabel =
      storefrontCategories.find((item) => item.slug === product.category)?.label ??
      product.category.charAt(0).toUpperCase() + product.category.slice(1);
    const payload: CatalogInput = {
      ...product,
      slug: cleanedSlug,
      storefrontPath: makeStorefrontPath(product.category, cleanedSlug, product.storefrontPath),
    };

    const existing = products.find((item) => item.slug === cleanedSlug);
    const localRecord = buildLocalProductRecord(payload, categoryLabel, existing);

    // Save immediately in the local catalog so Draft/Publish never waits on
    // the remote API to give the user visible feedback.
    dispatch(upsertAdminProduct(stampAdminProduct(localRecord)));
    showSaveToast("Product saved");

    void (async () => {
      const remoteRecord = await syncRemoteProduct(
        payload,
        categoryLabel,
        products,
      );

      if (remoteRecord) {
        dispatch(upsertAdminProduct(stampAdminProduct(remoteRecord)));
      }
    })();

    return true;
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
        dispatch(removeAdminProduct(slug));
        toast.success("Product removed");
      }
    } catch {
      toast.error("Unable to delete product");
    }
  };

  const saveSettings = (next: Partial<AdminSettings>) => {
    dispatch(mergeAdminSettings(next));
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

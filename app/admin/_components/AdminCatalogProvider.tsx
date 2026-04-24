"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import toast from "react-hot-toast";
import {
  ADMIN_CATALOG_STORAGE_KEY,
  ADMIN_SETTINGS_STORAGE_KEY,
  fallbackProducts,
  makeStorefrontPath,
  sanitizeAdminProductsForStorage,
  slugify,
  stampAdminProduct,
  toCatalogInput,
} from "../_lib/catalog";
import { categories as storefrontCategories } from "../../lib/products";
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
import { useAdminCatalogQueries } from "./useAdminCatalogQueries";
import { mutateStorefrontCatalogCache } from "./storefrontCatalogCache";
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

  const writeValue = (nextValue: unknown) => {
    window.localStorage.setItem(key, JSON.stringify(nextValue));
  };

  if (key === ADMIN_CATALOG_STORAGE_KEY && Array.isArray(value)) {
    try {
      writeValue(sanitizeAdminProductsForStorage(value as AdminProduct[]));
      return;
    } catch (error) {
      console.warn("Catalog storage is too large; clearing persisted catalog.", error);
      try {
        window.localStorage.removeItem(key);
      } catch {
        // Ignore secondary storage failures.
      }
      return;
    }
  }

  try {
    writeValue(value);
  } catch (error) {
    console.warn(`Failed to persist ${key}.`, error);
  }
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

const mergeAdminProducts = (
  baseProducts: AdminProduct[],
  incomingProducts: AdminProduct[],
) => {
  const merged = new Map<string, AdminProduct>();

  for (const product of baseProducts) {
    merged.set(product.slug, product);
  }

  for (const product of incomingProducts) {
    const existing = merged.get(product.slug);

    if (!existing) {
      merged.set(product.slug, product);
      continue;
    }

    const existingUpdatedAt = existing.updatedAt ?? "";
    const incomingUpdatedAt = product.updatedAt ?? "";
    merged.set(
      product.slug,
      incomingUpdatedAt > existingUpdatedAt ? product : existing,
    );
  }

  return Array.from(merged.values());
};

const imageSetFromUrl = (url: string) => ({
  mobile: url,
  tablet: url,
  desktop: url,
});

const getFallbackTemplate = (category: CatalogInput["category"]) =>
  fallbackProducts.find((product) => product.category === category) ??
  fallbackProducts[0];

const buildLocalProductRecord = (
  product: CatalogInput,
  categoryLabel: string,
  existing?: AdminProduct,
): AdminProduct => {
  const template = existing ?? getFallbackTemplate(product.category);
  const imageUrl = product.image || template.image;

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
    image: imageUrl,
    categoryImage: imageSetFromUrl(imageUrl),
    productImage: imageSetFromUrl(imageUrl),
    gallery: {
      first: imageSetFromUrl(imageUrl),
      second: imageSetFromUrl(imageUrl),
      third: imageSetFromUrl(imageUrl),
    },
    storefrontPath: makeStorefrontPath(
      product.category,
      product.slug,
      product.storefrontPath,
    ),
    updatedAt: new Date().toISOString(),
  };
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
  const productsRef = useRef(products);
  useEffect(() => {
    productsRef.current = products;
  }, [products]);
  const {
    remoteProductsQuery,
    syncCatalog,
    upsertRemoteProduct,
    deleteRemoteProduct,
  } = useAdminCatalogQueries({
    enabled: isHydrated,
    onRemoteProductUpsert: (remoteRecord) => {
      dispatch(upsertAdminProduct(stampAdminProduct(remoteRecord)));
    },
  });

  const handleSyncCatalog = async () => {
    dispatch(setAdminSyncing(true));

    try {
      const refreshedProducts = await syncCatalog();
      try {
        await mutateStorefrontCatalogCache({
          action: "replace",
          products: refreshedProducts,
        });
      } catch (error) {
        console.warn("Failed to prime the storefront catalog cache.", error);
      }
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
    } else {
      dispatch(setAdminProducts(fallbackProducts));
    }

    if (storedSettings) {
      dispatch(setAdminSettings(storedSettings));
    }

    dispatch(setAdminHydrated(true));

  }, [dispatch]);

  useEffect(() => {
    if (!isHydrated || remoteProductsQuery.dataUpdatedAt === 0) return;

    const remoteProducts = remoteProductsQuery.data ?? [];

    if (remoteProducts.length === 0) {
      return;
    }

    const mergedProducts = mergeAdminProducts(
      productsRef.current,
      remoteProducts,
    );

    dispatch(setAdminProducts(mergedProducts));
    dispatch(setAdminLastSyncedAt(new Date().toISOString()));
    void mutateStorefrontCatalogCache({
      action: "replace",
      products: mergedProducts,
    }).catch((error) => {
      console.warn("Failed to prime the storefront catalog cache.", error);
    });
  }, [dispatch, isHydrated, remoteProductsQuery.dataUpdatedAt]);

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
    const isPublished = product.status === "Live";
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

    try {
      await upsertRemoteProduct({
        product: localRecord,
        existingProducts: products,
      });
    } catch (error) {
      console.warn("Remote product save failed.", error);
      toast.error("Product saved locally, but the backend did not accept it yet");
      return false;
    }

    try {
      await syncCatalog(
        isPublished
          ? {
            waitForSlug: payload.slug,
          }
          : undefined,
      );
      toast.success(
        isPublished ? "Product published and synced" : "Product saved and synced",
      );
      return true;
    } catch {
      toast.error(
        isPublished
          ? "Product published, but storefront sync is still catching up"
          : "Product saved, but catalog sync is still catching up",
      );
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
    const existing = products.find((product) => product.slug === slug);

    if (!existing) {
      toast.error("Product not found");
      return;
    }

    try {
      await deleteRemoteProduct(slug);
    } catch {
      console.warn("Remote product delete failed.");
      toast.error("Product could not be deleted on the backend");
      return;
    }

    try {
      await mutateStorefrontCatalogCache({
        action: "remove",
        slug,
      });
    } catch (error) {
      console.warn("Failed to update the storefront catalog cache after delete.", error);
    }

    dispatch(removeAdminProduct(slug));

    try {
      await syncCatalog();
      toast.success("Product removed and synced");
    } catch {
      toast.success("Product removed");
      console.warn("Catalog sync failed after remote delete.");
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
      syncCatalog: handleSyncCatalog,
      upsertProduct,
      duplicateProduct,
      deleteProduct,
      saveSettings,
      getProductBySlug,
    }),
    [
      products,
      orders,
      settings,
      isHydrated,
      isSyncing,
      lastSyncedAt,
      handleSyncCatalog,
      upsertProduct,
      duplicateProduct,
      deleteProduct,
      saveSettings,
      getProductBySlug,
    ],
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

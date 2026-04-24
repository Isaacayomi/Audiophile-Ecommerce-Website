import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  AdminOrder,
  AdminProduct,
  AdminSettings,
} from "../../type";
import {
  defaultSettings,
  fallbackOrders,
  fallbackProducts,
  normalizeAdminProducts,
} from "../../admin/_lib/catalog";

export type AdminCatalogState = {
  products: AdminProduct[];
  orders: AdminOrder[];
  settings: AdminSettings;
  isHydrated: boolean;
  isSyncing: boolean;
  lastSyncedAt: string | null;
};

// Fallback data ships with the build so the dashboard renders immediately before the remote catalog loads.
const initialState: AdminCatalogState = {
  products: normalizeAdminProducts(fallbackProducts),
  orders: fallbackOrders,
  settings: defaultSettings,
  isHydrated: false,
  isSyncing: false,
  lastSyncedAt: null,
};

export const adminCatalogSlice = createSlice({
  name: "adminCatalog",
  initialState,
  reducers: {
    setAdminProducts: (state, action: PayloadAction<AdminProduct[]>) => {
      state.products = normalizeAdminProducts(action.payload);
    },
    upsertAdminProduct: (state, action: PayloadAction<AdminProduct>) => {
      const next = state.products.filter(
        (product) => product.slug !== action.payload.slug,
      );
      // Prepend before normalizing so the upserted product sorts to the top as most-recently-updated.
      next.unshift(action.payload);
      state.products = normalizeAdminProducts(next);
    },
    removeAdminProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product.slug !== action.payload,
      );
    },
    setAdminSettings: (state, action: PayloadAction<AdminSettings>) => {
      state.settings = action.payload;
    },
    mergeAdminSettings: (state, action: PayloadAction<Partial<AdminSettings>>) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    setAdminHydrated: (state, action: PayloadAction<boolean>) => {
      state.isHydrated = action.payload;
    },
    setAdminSyncing: (state, action: PayloadAction<boolean>) => {
      state.isSyncing = action.payload;
    },
    setAdminLastSyncedAt: (state, action: PayloadAction<string | null>) => {
      state.lastSyncedAt = action.payload;
    },
  },
});

export const {
  setAdminProducts,
  upsertAdminProduct,
  removeAdminProduct,
  setAdminSettings,
  mergeAdminSettings,
  setAdminHydrated,
  setAdminSyncing,
  setAdminLastSyncedAt,
} = adminCatalogSlice.actions;

export default adminCatalogSlice.reducer;

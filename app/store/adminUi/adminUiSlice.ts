import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  AdminProductFilterState,
  AdminSettingsDraft,
  AdminSidebarState,
} from "../../type";
import { defaultSettings } from "../../admin/_lib/catalog";

export type AdminUiState = {
  sidebar: AdminSidebarState;
  productFilter: AdminProductFilterState;
  settingsDraft: AdminSettingsDraft;
};

const initialState: AdminUiState = {
  sidebar: {
    isOpen: false,
  },
  productFilter: {
    query: "",
    category: "all",
  },
  settingsDraft: defaultSettings,
};

export const adminUiSlice = createSlice({
  name: "adminUi",
  initialState,
  reducers: {
    setAdminSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebar.isOpen = action.payload;
    },
    toggleAdminSidebar: (state) => {
      state.sidebar.isOpen = !state.sidebar.isOpen;
    },
    setAdminProductQuery: (state, action: PayloadAction<string>) => {
      state.productFilter.query = action.payload;
    },
    setAdminProductCategory: (
      state,
      action: PayloadAction<AdminProductFilterState["category"]>,
    ) => {
      state.productFilter.category = action.payload;
    },
    setAdminSettingsDraft: (state, action: PayloadAction<AdminSettingsDraft>) => {
      state.settingsDraft = action.payload;
    },
    mergeAdminSettingsDraft: (
      state,
      action: PayloadAction<Partial<AdminSettingsDraft>>,
    ) => {
      state.settingsDraft = { ...state.settingsDraft, ...action.payload };
    },
    resetAdminSettingsDraft: (state) => {
      state.settingsDraft = defaultSettings;
    },
  },
});

export const {
  setAdminSidebarOpen,
  toggleAdminSidebar,
  setAdminProductQuery,
  setAdminProductCategory,
  setAdminSettingsDraft,
  mergeAdminSettingsDraft,
  resetAdminSettingsDraft,
} = adminUiSlice.actions;

export default adminUiSlice.reducer;

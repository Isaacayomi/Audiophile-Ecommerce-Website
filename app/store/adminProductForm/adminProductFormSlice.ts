import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {
  AdminProductFormState,
  AdminProductFormValues,
  CatalogStatus,
} from "../../type";

const createEmptyAdminProductForm = (): AdminProductFormValues => ({
  name: "",
  shortName: "",
  category: "headphones",
  price: "2999",
  stock: "25",
  status: "Draft",
  featured: false,
  description:
    "Write a concise Audiophile description that highlights sound, design, and build quality.",
  image: "/assets/product-xx99-mark-two-headphones/desktop/image-product.jpg",
});

const createInitialState = (): AdminProductFormState => ({
  form: createEmptyAdminProductForm(),
  saveMode: "Draft",
  pendingSubmitMode: "Draft",
  isSaving: false,
  isUploadingImage: false,
});

export const adminProductFormSlice = createSlice({
  name: "adminProductForm",
  initialState: createInitialState(),
  reducers: {
    setAdminProductForm: (
      state,
      action: PayloadAction<AdminProductFormValues>,
    ) => {
      state.form = action.payload;
    },
    mergeAdminProductForm: (
      state,
      action: PayloadAction<Partial<AdminProductFormValues>>,
    ) => {
      state.form = { ...state.form, ...action.payload };
    },
    resetAdminProductForm: (state) => {
      state.form = createEmptyAdminProductForm();
      state.saveMode = "Draft";
      state.pendingSubmitMode = "Draft";
      state.isSaving = false;
      state.isUploadingImage = false;
    },
    setAdminProductSaveMode: (state, action: PayloadAction<CatalogStatus>) => {
      state.saveMode = action.payload;
      state.pendingSubmitMode = action.payload;
    },
    setAdminProductPendingSubmitMode: (
      state,
      action: PayloadAction<CatalogStatus>,
    ) => {
      state.pendingSubmitMode = action.payload;
    },
    setAdminProductIsSaving: (state, action: PayloadAction<boolean>) => {
      state.isSaving = action.payload;
    },
    setAdminProductIsUploadingImage: (state, action: PayloadAction<boolean>) => {
      state.isUploadingImage = action.payload;
    },
  },
});

export const {
  setAdminProductForm,
  mergeAdminProductForm,
  resetAdminProductForm,
  setAdminProductSaveMode,
  setAdminProductPendingSubmitMode,
  setAdminProductIsSaving,
  setAdminProductIsUploadingImage,
} = adminProductFormSlice.actions;

export { createEmptyAdminProductForm };

export default adminProductFormSlice.reducer;

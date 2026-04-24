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
  price: "",
  stock: "",
  status: "Live",
  featured: false,
  description: "",
  image: "",
});

const createInitialState = (): AdminProductFormState => ({
  form: createEmptyAdminProductForm(),
  saveMode: "Live",
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
      state.saveMode = "Live";
      state.isSaving = false;
      state.isUploadingImage = false;
    },
    setAdminProductSaveMode: (state, action: PayloadAction<CatalogStatus>) => {
      state.saveMode = action.payload;
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
  setAdminProductIsSaving,
  setAdminProductIsUploadingImage,
} = adminProductFormSlice.actions;

export { createEmptyAdminProductForm };

export default adminProductFormSlice.reducer;

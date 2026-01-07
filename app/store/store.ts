import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiState/uiSlice";
import cartReducer from "./uiState/cartSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

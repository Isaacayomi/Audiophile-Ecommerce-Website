import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiState/uiSlice";
import cartReducer from "./uiState/cartSlice";
import checkoutReducer from "./uiState/checkoutSlice";
import orderCompletionReducer from "./uiState/orderCompletionSlice";
import cartValueReducer from "./uiState/cartValueslice";
import adminCatalogReducer from "./adminCatalog/adminCatalogSlice";

export const store = configureStore({
  // Each key here becomes a top-level key in RootState.
  reducer: {
    ui: uiReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    orderCompletion: orderCompletionReducer,
    cartValue: cartValueReducer,
    adminCatalog: adminCatalogReducer,
  },
});

// Full Redux state shape inferred from the configured reducers.
export type RootState = ReturnType<typeof store.getState>;
// Dispatch type used for strongly typed action dispatching in components.
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiState/uiSlice";
import cartReducer from "./uiState/cartSlice";
import checkoutReducer from "./uiState/checkoutSlice";
import orderCompletionReducer from "./uiState/orderCompletionSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    orderCompletion: orderCompletionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

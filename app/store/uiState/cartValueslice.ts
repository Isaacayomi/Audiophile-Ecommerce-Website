import { cartValueState } from "@/app/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: cartValueState = {
  // Persisted cart count used by header/cart badge UI.
  value: 0,
  // Quantity picker value shown in ProductPurchaseCard.
  selectedValue: 1,
};

export const increaseValueSlice = createSlice({
  name: "increaseValue",
  initialState,
  reducers: {
    // Increases the temporary quantity picker value.
    increaseValue: (state) => {
      state.selectedValue += 1;
    },
    // Decreases picker value but never goes below one.
    decreaseValue: (state) => {
      state.selectedValue = Math.max(1, state.selectedValue - 1);
    },
    // Adds an arbitrary amount (used by "Add to cart" with selected quantity).
    addToCartValue: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
      state.selectedValue = 1;
    },
  },
});

export const { increaseValue, decreaseValue, addToCartValue } =
  increaseValueSlice.actions;
export default increaseValueSlice.reducer;

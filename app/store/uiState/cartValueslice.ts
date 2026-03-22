import { cartValueState } from "@/app/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: cartValueState = {
  // Persisted cart count used by header/cart badge UI.
  value: 0,
};

export const increaseValueSlice = createSlice({
  name: "increaseValue",
  initialState,
  reducers: {
    // Increases the cart count by one unit.
    increaseValue: (state) => {
      state.value += 1;
    },
    // Decreases count but never allows negative totals.
    decreaseValue: (state) => {
      state.value -= 1;
      state.value <= 0 ? (state.value = 0) : (state.value = state.value);
    },
    // Adds an arbitrary amount (used by "Add to cart" with selected quantity).
    addToCartValue: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increaseValue, decreaseValue, addToCartValue } =
  increaseValueSlice.actions;
export default increaseValueSlice.reducer;

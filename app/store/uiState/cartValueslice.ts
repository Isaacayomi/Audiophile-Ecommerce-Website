import { cartValueState } from "@/app/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState: cartValueState = {
  value: 0,
  selectedValue: 1,
  // Concrete cart line items rendered in the cart modal.
  items: [],
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
    // Adds/merges a product line in cart and increases global cart count.
    addToCartValue: (
      state,
      action: PayloadAction<{
        slug: string;
        name: string;
        shortName: string;
        price: number;
        image: string;
        quantity: number;
      }>,
    ) => {
      const { slug, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.slug === slug);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push(action.payload);
      }

      state.value += quantity;
      state.selectedValue = 1;
    },
    increaseCartItemQuantity: (state, action: PayloadAction<string>) => {
      // Increment one cart row and keep global badge count in sync.
      const item = state.items.find((entry) => entry.slug === action.payload);
      if (!item) return;

      item.quantity += 1;
      state.value += 1;
    },
    decreaseCartItemQuantity: (state, action: PayloadAction<string>) => {
      // Decrement one cart row; remove row when quantity reaches zero.
      const item = state.items.find((entry) => entry.slug === action.payload);
      if (!item) return;

      item.quantity -= 1;
      state.value = Math.max(0, state.value - 1);

      if (item.quantity <= 0) {
        state.items = state.items.filter(
          (entry) => entry.slug !== action.payload,
        );
      }
    },
    // Removes one item line fully from the cart
    removeCartItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find((entry) => entry.slug === action.payload);
      if (!item) return;

      state.value = Math.max(0, state.value - item.quantity);
      state.items = state.items.filter(
        (entry) => entry.slug !== action.payload,
      );
    },
    removeAllCartItems: (state) => {
      // Full cart reset used by "Remove all" and post-checkout cleanup paths.
      state.items = [];
      state.value = 0;
      state.selectedValue = 1;
      toast.success(`${state.shortName} removed from cart`);
    },
  },
});

export const {
  increaseValue,
  decreaseValue,
  addToCartValue,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  removeCartItem,
  removeAllCartItems,
} = increaseValueSlice.actions;
export default increaseValueSlice.reducer;

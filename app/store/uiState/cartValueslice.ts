import { cartValueState } from "@/app/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const CART_STORAGE_KEY = "audiophile.cartValue";

const initialState: cartValueState = {
  value: 0,
  selectedValue: 1,
  // Concrete cart line items rendered in the cart modal.
  items: [],
};

const getStockLimitMessage = (stock: number) =>
  stock <= 0 ? "This item is out of stock." : `Only ${stock} left in stock.`;

export const increaseValueSlice = createSlice({
  name: "increaseValue",
  initialState,
  reducers: {
    // Increases the temporary quantity picker value, up to an optional max.
    increaseValue: (
      state,
      action: PayloadAction<{ max?: number } | undefined>,
    ) => {
      const max = action.payload?.max;
      if (typeof max === "number" && state.selectedValue >= max) return;
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
        stock?: number;
      }>,
    ) => {
      const { slug, quantity, stock } = action.payload;
      const existingItem = state.items.find((item) => item.slug === slug);
      const currentQuantity = existingItem?.quantity ?? 0;
      const remainingStock =
        typeof stock === "number"
          ? Math.max(0, stock - currentQuantity)
          : quantity;
      const quantityToAdd =
        typeof stock === "number"
          ? Math.min(quantity, remainingStock)
          : quantity;

      if (typeof stock === "number" && quantityToAdd <= 0) {
        toast.error(getStockLimitMessage(stock));
        state.selectedValue = 1;
        return;
      }

      if (existingItem) {
        existingItem.quantity += quantityToAdd;
        if (typeof stock === "number") {
          existingItem.stock = stock;
        }
      } else {
        state.items.push({
          ...action.payload,
          quantity: quantityToAdd,
        });
      }

      state.value += quantityToAdd;
      state.selectedValue = 1;

      if (typeof stock === "number" && quantityToAdd < quantity) {
        toast.error(getStockLimitMessage(stock));
      }
    },
    hydrateCartValue: (state, action: PayloadAction<cartValueState>) => {
      state.value = action.payload.value;
      state.selectedValue = action.payload.selectedValue ?? 1;
      state.items = action.payload.items ?? [];
    },
    increaseCartItemQuantity: (state, action: PayloadAction<string>) => {
      // Increment one cart row and keep global badge count in sync.
      const item = state.items.find((entry) => entry.slug === action.payload);
      if (!item) return;

      if (typeof item.stock === "number" && item.quantity >= item.stock) {
        toast.error(getStockLimitMessage(item.stock));
        return;
      }

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
      toast.success("Cart cleared");
    },
  },
});

export const {
  increaseValue,
  decreaseValue,
  addToCartValue,
  hydrateCartValue,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  removeCartItem,
  removeAllCartItems,
} = increaseValueSlice.actions;
export default increaseValueSlice.reducer;

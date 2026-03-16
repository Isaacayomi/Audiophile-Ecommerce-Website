import { createSlice } from "@reduxjs/toolkit";
import { toggleCheckoutState } from "../../type";

const initialState: toggleCheckoutState = {
  value: false,
};

export const toggleCheckoutSlice = createSlice({
  name: "toggleCheckout",
  initialState,
  reducers: {
    toggleCheckout: (state) => {
      state.value = !state.value;
    },
    closeCheckout: (state) => {
      state.value = false;
    },
  },
});

export const { toggleCheckout, closeCheckout } = toggleCheckoutSlice.actions;
export default toggleCheckoutSlice.reducer;

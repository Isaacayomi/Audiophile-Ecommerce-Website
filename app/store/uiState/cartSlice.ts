import { createSlice } from "@reduxjs/toolkit";
import { toggleCartState } from "../../type";

const initialState: toggleCartState = {
  value: false,
};

export const toggleCartSlice = createSlice({
  name: "toggleCart",
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.value === false ? (state.value = true) : (state.value = false);
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleCart } = toggleCartSlice.actions;

export default toggleCartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { OpenNavState } from "../type";

const initialState: OpenNavState = {
  value: false,
};

export const openNavSlice = createSlice({
  name: "toggleNav",
  initialState,
  reducers: {
    toggleNav: (state) => {
      state.value === false ? (state.value = true) : (state.value = false);
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleNav } = openNavSlice.actions;

export default openNavSlice.reducer;

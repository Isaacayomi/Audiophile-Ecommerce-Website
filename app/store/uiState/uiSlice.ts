import { createSlice } from "@reduxjs/toolkit";
import { toggleNavState } from "../../type";

const initialState: toggleNavState = {
  value: false,
};

export const toggleNavSlice = createSlice({
  name: "toggleNav",
  initialState,
  reducers: {
    toggleNav: (state) => {
      state.value === false ? (state.value = true) : (state.value = false);
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleNav } = toggleNavSlice.actions;

export default toggleNavSlice.reducer;

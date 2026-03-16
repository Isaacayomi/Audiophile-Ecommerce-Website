import { createSlice } from "@reduxjs/toolkit";
import { toggleOrderCompletionState } from "../../type";

const initialState: toggleOrderCompletionState = {
  value: false,
};

export const orderCompletionSlice = createSlice({
  name: "orderCompletion",
  initialState,
  reducers: {
    toggleOrderCompletion: (state) => {
      state.value = !state.value;
    },
    closeOrderCompletion: (state) => {
      state.value = false;
    },
  },
});

export const { toggleOrderCompletion, closeOrderCompletion } =
  orderCompletionSlice.actions;
export default orderCompletionSlice.reducer;

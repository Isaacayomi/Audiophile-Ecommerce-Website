import { cartValueState } from "@/app/type";
import { createSlice } from "@reduxjs/toolkit";

const initialState: cartValueState = {
  value: 0,
};

export const increaseValueSlice = createSlice({
  name: "increaseValue",
  initialState,
  reducers: {
    increaseValue: (state) => {
      state.value += 1;
    },
    decreaseValue: (state) => {
      state.value -= 1;
      state.value <= 0 ? (state.value = 0) : (state.value = state.value);
    },
  },
});

export const { increaseValue, decreaseValue } = increaseValueSlice.actions;
export default increaseValueSlice.reducer;

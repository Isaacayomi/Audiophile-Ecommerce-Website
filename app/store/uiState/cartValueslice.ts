import { cartValueState } from "@/app/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: cartValueState = {
  value: 0,
  selectedValue: 1,
};

export const increaseValueSlice = createSlice({
  name: "increaseValue",
  initialState,
  reducers: {
    increaseValue: (state) => {
      state.selectedValue += 1;
    },
    decreaseValue: (state) => {
      state.selectedValue = Math.max(1, state.selectedValue - 1);
    },
    addToCartValue: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
      state.selectedValue = 1;
    },
  },
});

export const { increaseValue, decreaseValue, addToCartValue } =
  increaseValueSlice.actions;
export default increaseValueSlice.reducer;

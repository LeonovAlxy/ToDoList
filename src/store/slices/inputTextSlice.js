import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "test",
};

const inputTextSlice = createSlice({
  name: "inputText",
  initialState,
  reducers: {
    change(state, action) {
      state.value = action.payload;
    },
    zero(state) {
      state.value = "";
    },
  },
  selectors: {
    selectInputText: (state) => state.value,
  },
});

export const { change, zero } = inputTextSlice.actions;

export const { selectInputText } = inputTextSlice.selectors;

export default inputTextSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    add(state, action) {
      state.value = action.payload;
    },
    zero(state) {
      state.value = "";
    },
  },
  selectors: {
    selectToken: (state) => state.value,
  },
});

export const { add, zero } = tokenSlice.actions;

export const { selectToken } = tokenSlice.selectors;

export default tokenSlice.reducer;

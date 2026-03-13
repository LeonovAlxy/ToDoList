import { configureStore } from "@reduxjs/toolkit";
import inputTextSlice from "./slices/inputTextSlice";
import tokenSlice from "./slices/tokenSlice";
import tasksSlice from "./slices/tasksSlice";

const store = configureStore({
  reducer: {
    inputText: inputTextSlice,
    tasks: tasksSlice,
    token: tokenSlice,
  },
});
export default store;

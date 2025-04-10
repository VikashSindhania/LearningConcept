import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice";
import counterSlice from "./counterSlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    counterStore: counterSlice,
  },
});

export default store;

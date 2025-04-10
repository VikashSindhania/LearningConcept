import { createSlice } from "@reduxjs/toolkit";

// Slice for Counter Redux App

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 0,
    user: "Vikash",
  },
  reducers: {
    increment: (state) => {
      state.count = state.count + 1;
    },
    decrement: (state) => {
      if (state.count > 0) {
        state.count = state.count - 1;
      }
    },
    refresh: (state) => {
      state.count = 0;
    },
  },
});

export const { increment, decrement, refresh } = counterSlice.actions;

export default counterSlice.reducer;

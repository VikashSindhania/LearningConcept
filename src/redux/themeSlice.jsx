// ThemeSlice redux code functionality below
import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    darkTheme: false,
  },
  reducers: {
    toggleDarkTheme: (state) => {
      state.darkTheme = !state.darkTheme;
    },
  },
});

export const { toggleDarkTheme } = themeSlice.actions;
export default themeSlice.reducer;

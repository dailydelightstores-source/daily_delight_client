import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSearchOpen: false
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openSearch: (state) => {
      state.isSearchOpen = true;
    },
    closeSearch: (state) => {
      state.isSearchOpen = false;
    }
  }
});

export const { openSearch, closeSearch } = uiSlice.actions;
export default uiSlice.reducer;

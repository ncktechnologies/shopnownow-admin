import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  siderCollapsed: true,
  siderHidden: false,
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleCollapseSider: (state) => {
      state.siderCollapsed = !state.siderCollapsed;
    },
    toggleSiderHidden: (state) => {
      state.siderHidden = !state.siderHidden;
    },
  },
  extraReducers: {},
});

const { reducer, actions } = slice;
export const { toggleCollapseSider, toggleSiderHidden } = actions;

export default reducer;

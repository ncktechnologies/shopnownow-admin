import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { profileService } from "../services/profile.service";

export const editProfile = createAsyncThunk(
  "profile/editProfile",
  async (data, { rejectWithValue }) => {
    try {
      const response = await profileService.editProfile(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const editProfilePicture = createAsyncThunk(
  "profile/editPicture",
  async (data, { rejectWithValue }) => {
    try {
      const response = await profileService.editProfilePicture(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await profileService.getProfile();
      return response;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const initialState = {
  data: [],
  singleData: {},
  loading: false,
  error: false,
  message: "",
};

const slice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    checkAll: (state) => {
      state.isChecked = !state.isChecked;
    },
  },
  extraReducers: {
    [getProfile.pending]: (state) => {
      state.loading = true;
    },
    [getProfile.fulfilled]: (state, { payload }) => {
      state.message = payload?.message;
      state.loading = false;
      state.singleData = payload;
    },
    [getProfile.rejected]: (state, { payload }) => {
      state.error = true;
      state.message = payload;
      state.loading = false;
    },

    [editProfile.fulfilled]: (state, { payload }) => {
      state.message = payload?.message;
    },
    [editProfile.rejected]: (state, { payload }) => {
      state.error = true;
      state.message = payload;
    },

    [editProfilePicture.fulfilled]: (state, { payload }) => {
      state.message = payload?.message;
    },
    [editProfilePicture.rejected]: (state, { payload }) => {
      state.error = true;
      state.message = payload;
    },
  },
});

export const action = slice.actions;
export default slice.reducer;

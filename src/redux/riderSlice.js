import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { riderService } from "../services/riderService";

export const getAllRiders = createAsyncThunk(
  "rider/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await riderService.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const getOneRider = createAsyncThunk(
  "rider/getOne",
  async (data, { rejectWithValue }) => {
    try {
      const response = await riderService.getOne(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const createRider = createAsyncThunk(
  "rider/createRider",
  async (data, { rejectWithValue }) => {
    try {
      const response = await riderService.createRider(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const blockRider = createAsyncThunk(
  "rider/blockRider",
  async (data, { rejectWithValue }) => {
    try {
      const response = await riderService.blockRider(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const approveRiderDoc = createAsyncThunk(
  "rider/approveRiderDoc",
  async (data, { rejectWithValue }) => {
    try {
      const response = await riderService.approveRiderDoc(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const declineRiderDoc = createAsyncThunk(
  "rider/declineRiderDoc",
  async (data, { rejectWithValue }) => {
    try {
      const response = await riderService.declineRiderDoc(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
export const assignRiderToOrder = createAsyncThunk(
  "rider/assignRiderToOrder",
  async (data, { rejectWithValue }) => {
    try {
      const response = await riderService.assignRiderToOrder(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateStatus = createAsyncThunk(
  "rider/updateStatus",
  async (data, { rejectWithValue }) => {
    try {
      const response = await riderService.updateStatus(data);
      return response.data;
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
  name: "rider",
  initialState,
  reducers: {
    checkAll: (state) => {
      state.isChecked = !state.isChecked;
    },
    resetSingleData: (state) => {
      state.singleData = {};
    },
  },
  extraReducers: {
    [getAllRiders.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true;
      }
    },
    [getAllRiders.fulfilled]: (state, action) => {
      state.error = false;
      state.data = action.payload;
      state.loading = false;
    },
    [getAllRiders.rejected]: (state, action) => {
      state.error = true;
      state.message = action.payload;
      state.loading = false;
    },

    [getOneRider.pending]: (state) => {
      state.loading = true;
    },
    [getOneRider.fulfilled]: (state, { payload }) => {
      state.message = payload?.message;
      state.loading = false;
      state.singleData = payload;
    },
    [getOneRider.rejected]: (state, { payload }) => {
      state.error = true;
      state.message = payload;
      state.loading = false;
    },
    [createRider.pending]: (state) => {
      state.loading = true;
    },
    [createRider.fulfilled]: (state, { payload }) => {
      state.message = payload?.message;
      state.loading = false;
      state.singleData = payload;
    },
    [createRider.rejected]: (state, { payload }) => {
      state.error = true;
      state.message = payload;
      state.loading = false;
    },
    [blockRider.pending]: (state) => {
      state.loading = true;
    },
    [blockRider.fulfilled]: (state, { payload }) => {
      state.message = payload?.message;
      state.loading = false;
      state.singleData = payload;
    },
    [blockRider.rejected]: (state, { payload }) => {
      state.error = true;
      state.message = payload;
      state.loading = false;
    },
    [approveRiderDoc.pending]: (state) => {
      state.loading = true;
    },
    [approveRiderDoc.fulfilled]: (state, { payload }) => {
      state.message = payload?.message;
      state.loading = false;
      state.singleData = payload;
    },
    [approveRiderDoc.rejected]: (state, { payload }) => {
      state.error = true;
      state.message = payload;
      state.loading = false;
    },
    [declineRiderDoc.pending]: (state) => {
      state.loading = true;
    },
    [declineRiderDoc.fulfilled]: (state, { payload }) => {
      state.message = payload?.message;
      state.loading = false;
      state.singleData = payload;
    },
    [declineRiderDoc.rejected]: (state, { payload }) => {
      state.error = true;
      state.message = payload;
      state.loading = false;
    },
    [assignRiderToOrder.pending]: (state) => {
      state.loading = true;
    },
    [assignRiderToOrder.fulfilled]: (state, { payload }) => {
      state.message = payload?.message;
      state.loading = false;
      state.singleData = payload;
    },
    [assignRiderToOrder.rejected]: (state, { payload }) => {
      state.error = true;
      state.message = payload;
      state.loading = false;
    },
    [updateStatus.pending]: (state) => {
      state.loading = true;
    },
    [updateStatus.fulfilled]: (state, { payload }) => {
      state.message = payload?.message;
      state.loading = false;
      state.singleData = payload;
    },
    [updateStatus.rejected]: (state, { payload }) => {
      state.error = true;
      state.message = payload;
      state.loading = false;
    },
  },
});

export const { resetSingleData } = slice.actions;
export default slice.reducer;

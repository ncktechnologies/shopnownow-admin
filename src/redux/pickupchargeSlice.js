import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { pickupService } from '../services/pickupService'

export const getAllPickup = createAsyncThunk(
  'pickupcharge/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await pickupService.getAll()
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const getOnePickup = createAsyncThunk(
  'pickupcharge/getOne',
  async (data, { rejectWithValue }) => {
    try {
      const response = await pickupService.getOne(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const createPickup = createAsyncThunk(
  'pickupcharge/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await pickupService.createPickup(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const editPickup = createAsyncThunk(
  'pickupcharge/edit',
  async (data, { rejectWithValue }) => {
    try {
      const response = await pickupService.editPickup(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const deletePickup = createAsyncThunk(
  'pickupcharge/delete',
  async (data, { rejectWithValue }) => {
    try {
      const response = await pickupService.deleteOne(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

const initialState = {
  data: [],
  singleData: {},
  loading: false,
  error: false,
  message: '',
}

const slice = createSlice({
  name: 'pickup',
  initialState,
  reducers: {
    checkAll: (state) => {
      state.isChecked = !state.isChecked
    },
    resetSingleData: (state) => {
      state.singleData = {}
    },
  },
  extraReducers: {
    [getAllPickup.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllPickup.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllPickup.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },

    [getOnePickup.pending]: (state) => {
      state.loading = true
    },
    [getOnePickup.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [getOnePickup.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [createPickup.pending]: (state) => {
      state.loading = true
    },
    [createPickup.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [createPickup.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [editPickup.pending]: (state) => {
      state.loading = true
    },
    [editPickup.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [editPickup.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [deletePickup.pending]: (state) => {
      state.loading = true
    },
    [deletePickup.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [deletePickup.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },
  },
})

export const { resetSingleData } = slice.actions
export default slice.reducer

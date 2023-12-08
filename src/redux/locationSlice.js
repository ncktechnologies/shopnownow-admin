import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { locationService } from '../services/locationService'

export const getAllLocations = createAsyncThunk(
  'location/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await locationService.getAll()
      return response
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const getOneLocation = createAsyncThunk(
  'location/getOne',
  async (data, { rejectWithValue }) => {
    try {
      const response = await locationService.getOne(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const createLocation = createAsyncThunk(
  'location/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await locationService.createLocation(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const editLocation = createAsyncThunk(
  'location/edit',
  async (data, { rejectWithValue }) => {
    try {
      const response = await locationService.editLocation(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const hideShowLocation = createAsyncThunk(
  'location/hideShowLocation',
  async (data, { rejectWithValue }) => {
    try {
      const response = await locationService.hideShowLocation(data)
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
  name: 'location',
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
    [getAllLocations.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllLocations.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllLocations.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },

    [getOneLocation.pending]: (state) => {
      state.loading = true
    },
    [getOneLocation.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [getOneLocation.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [createLocation.pending]: (state) => {
      state.loading = true
    },
    [createLocation.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [createLocation.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [editLocation.pending]: (state) => {
      state.loading = true
    },
    [editLocation.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [editLocation.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [hideShowLocation.pending]: (state) => {
      state.loading = true
    },
    [hideShowLocation.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [hideShowLocation.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },
  },
})

export const { resetSingleData } = slice.actions
export default slice.reducer

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { bandService } from '../services/bandService'

export const getAllBands = createAsyncThunk(
  'band/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await bandService.getAll()
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const getOneBand = createAsyncThunk(
  'band/getOne',
  async (data, { rejectWithValue }) => {
    try {
      const response = await bandService.getOne(data)
      return response
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const createBand = createAsyncThunk(
  'band/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await bandService.createBand(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const editBand = createAsyncThunk('band/edit', async (data, { rejectWithValue }) => {
  try {
    const response = await bandService.editBand(data)
    return response.data
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})






const initialState = {
  data: [],
  singleData: {},
  loading: false,
  error: false,
  message: '',
}

const slice = createSlice({
  name: 'band',
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
    [getAllBands.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllBands.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllBands.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },

    [getOneBand.pending]: (state) => {
      state.loading = true
    },
    [getOneBand.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [getOneBand.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [createBand.pending]: (state) => {
      state.loading = true
    },
    [createBand.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [createBand.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [editBand.pending]: (state) => {
      state.loading = true
    },
    [editBand.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [editBand.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

   
  },
})

export const { resetSingleData } = slice.actions
export default slice.reducer

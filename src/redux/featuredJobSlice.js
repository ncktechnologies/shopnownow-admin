import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { jobService } from '../services/jobService.js'

export const getAllFeatured = createAsyncThunk(
  'job/getAllFeatured',
  async (_, { rejectWithValue }) => {
    try {
      const response = await jobService.getAllFeatured()
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const getOneJob = createAsyncThunk(
  'job/getOne',
  async (data, { rejectWithValue }) => {
    try {
      const response = await jobService.getOne(data)
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
  name: 'jobs',
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
    [getAllFeatured.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllFeatured.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllFeatured.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },

    [getOneJob.pending]: (state) => {
      state.loading = true
    },
    [getOneJob.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [getOneJob.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },


  },
})

export const { resetSingleData } = slice.actions
export default slice.reducer

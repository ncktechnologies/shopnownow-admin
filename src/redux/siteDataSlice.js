import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { siteDataService } from '../services/siteDataService'

export const getAllSiteData = createAsyncThunk(
  'siteData/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await siteDataService.getAll()
      return response
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)


export const editSiteData = createAsyncThunk('siteData/edit', async (data, { rejectWithValue }) => {
  try {
    const response = await siteDataService.editSiteData(data)
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
  name: 'sitedata',
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
    [getAllSiteData.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllSiteData.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllSiteData.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },
    [editSiteData.pending]: (state) => {
      state.loading = true
    },
    [editSiteData.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [editSiteData.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    }
  },
})

export const { resetSingleData } = slice.actions
export default slice.reducer
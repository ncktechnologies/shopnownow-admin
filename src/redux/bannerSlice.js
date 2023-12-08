import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BannerService } from '../services/BannerService'

export const getAllBanners = createAsyncThunk('banner/getAll', async (_, { rejectWithValue }) => {
  try {
    const response = await BannerService.getAll()
    return response.data
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

export const getOneBanner = createAsyncThunk('banner/getOne', async (data, { rejectWithValue }) => {
  try {
    const response = await BannerService.getOne(data)
    return response.data
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

export const createBanner = createAsyncThunk('banner/create', async (data, { rejectWithValue }) => {
  try {
    const response = await BannerService.createBanner(data)
    return response.data
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

export const editBanner = createAsyncThunk('banner/edit', async (data, { rejectWithValue }) => {
  try {
    const response = await BannerService.editBanner(data)
    return response.data
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

export const deleteBanner = createAsyncThunk('banner/delete', async (data, { rejectWithValue }) => {
  try {
    const response = await BannerService.deleteOne(data)
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
  name: 'banner',
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
    [getAllBanners.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllBanners.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllBanners.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },

    [getOneBanner.pending]: (state) => {
      state.loading = true
    },
    [getOneBanner.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [getOneBanner.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [createBanner.pending]: (state) => {
      state.loading = true
    },
    [createBanner.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [createBanner.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [editBanner.pending]: (state) => {
      state.loading = true
    },
    [editBanner.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [editBanner.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [deleteBanner.pending]: (state) => {
      state.loading = true
    },
    [deleteBanner.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [deleteBanner.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },
  },
})

export const { resetSingleData } = slice.actions
export default slice.reducer

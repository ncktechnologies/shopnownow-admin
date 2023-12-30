import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { quickGuideService } from '../services/quickGuideService'

export const getAllQuickGuides = createAsyncThunk('quickGuide/getAll', async (_, { rejectWithValue }) => {
  try {
    const response = await quickGuideService.getAll()
    return response
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

export const deleteQuickGuide = createAsyncThunk(
  'quickGuide/delete',
  async (data, { rejectWithValue }) => {
    try {
      const response = await quickGuideService.deleteOne(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)


export const createQuickGuide = createAsyncThunk('quickGuide/create', async (data, { rejectWithValue }) => {
  try {
    const response = await quickGuideService.createQuickGuide(data)
    return response.data
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

export const editQuickGuide = createAsyncThunk('quickGuide/edit', async (data, { rejectWithValue }) => {
  try {
    const response = await quickGuideService.editQuickGuide(data)
    return response.data
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

export const hideShowQuickGuide = createAsyncThunk(
  'quickGuide/hideShowQuickGuide',
  async (data, { rejectWithValue }) => {
    try {
      const response = await quickGuideService.hideShowQuickGuide(data)
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
  name: 'quickGuide',
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
    [getAllQuickGuides.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllQuickGuides.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllQuickGuides.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },
    [deleteQuickGuide.pending]: (state) => {
      state.loading = true
    },
    [deleteQuickGuide.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [deleteQuickGuide.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },



    [createQuickGuide.pending]: (state) => {
      state.loading = true
    },
    [createQuickGuide.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [createQuickGuide.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [editQuickGuide.pending]: (state) => {
      state.loading = true
    },
    [editQuickGuide.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [editQuickGuide.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [hideShowQuickGuide.pending]: (state) => {
      state.loading = true
    },
    [hideShowQuickGuide.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [hideShowQuickGuide.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },
  

  },
})

export const { resetSingleData } = slice.actions
export default slice.reducer

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { settingsService } from '../services/settingsService'

export const getAllSettings = createAsyncThunk(
  'settings/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await settingsService.getAll()
      return response
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)


export const createSettings = createAsyncThunk(
  'settings/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await settingsService.createSettings(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const editSettings = createAsyncThunk(
  'settings/edit',
  async (data, { rejectWithValue }) => {
    try {
      const response = await settingsService.editSettings(data)
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
  name: 'settings',
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
    [getAllSettings.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllSettings.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllSettings.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },

    

    [createSettings.pending]: (state) => {
      state.loading = true
    },
    [createSettings.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [createSettings.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [editSettings.pending]: (state) => {
      state.loading = true
    },
    [editSettings.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [editSettings.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

   
  },
})

export const { resetSingleData } = slice.actions
export default slice.reducer

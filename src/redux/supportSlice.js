import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { SupportService } from '../services/SupportService'

export const getAllSupports = createAsyncThunk('support/getAll', async (_, { rejectWithValue }) => {
  try {
    const response = await SupportService.getAll()
    return response.data
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

export const getOneSupport = createAsyncThunk(
  'support/getOne',
  async (data, { rejectWithValue }) => {
    try {
      const response = await SupportService.getOne(data)
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
  name: 'support',
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
    [getAllSupports.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllSupports.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllSupports.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },

    [getOneSupport.pending]: (state) => {
      state.loading = true
    },
    [getOneSupport.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [getOneSupport.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },
  },
})

export const { resetSingleData } = slice.actions
export default slice.reducer

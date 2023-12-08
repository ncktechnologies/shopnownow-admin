import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { paymentService } from '../services/paymentService'

export const getAllPayments = createAsyncThunk('payment/getAll', async (_, { rejectWithValue }) => {
  try {
    const response = await paymentService.getAll()
    return response
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

export const getOnePayment = createAsyncThunk(
  'payment/getOne',
  async (data, { rejectWithValue }) => {
    try {
      const response = await paymentService.getOne(data)
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
  name: 'payment',
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
    [getAllPayments.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllPayments.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllPayments.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },

    [getOnePayment.pending]: (state) => {
      state.loading = true
    },
    [getOnePayment.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [getOnePayment.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },
  },
})

export const { resetSingleData } = slice.actions
export default slice.reducer

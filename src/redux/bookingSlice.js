import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { bookingService } from '../services/booking.service'


export const getAllBookings = createAsyncThunk(
  'booking/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await bookingService.getAll()
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const getOneBooking = createAsyncThunk(
  'booking/getOne',
  async (data, { rejectWithValue }) => {
    try {
      const response = await bookingService.getOne(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const getBookingByStatus = createAsyncThunk(
  'booking/getByStatus',
  async (data, { rejectWithValue }) => {
    try {
      const response = await bookingService.getByStatus(data)
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
  name: 'patient',
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
    [getAllBookings.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllBookings.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllBookings.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },


    [getOneBooking.pending]: (state) => {
      state.loading = true
    },
    [getOneBooking.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [getOneBooking.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [getBookingByStatus.pending] : state =>{
        state.loading = true
    },
    [getBookingByStatus.fulfilled] : (state, {payload}) =>{
        state.loading = false
        state.data = payload.data
      state.message = payload?.message
    },
    [getBookingByStatus.rejected]: (state, { payload }) => {
        state.error = true
        state.message = payload
        state.loading = false
      },
  },
})

export const { resetSelectedPhysician } = slice.actions
export default slice.reducer

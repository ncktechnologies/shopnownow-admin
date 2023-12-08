import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { transactionService } from '../services/transaction.service'

export const getAllTransaction = createAsyncThunk(
  'transactions/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await transactionService.getAll()
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const getOneTransaction = createAsyncThunk(
  'transactions/getOne',
  async (data, { rejectWithValue }) => {
    try {
      const response = await transactionService.getOne(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const approveTransaction = createAsyncThunk(
  'transactions/approve',
  async (data, { rejectWithValue }) => {
    try {
      const response = await transactionService.approve(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const declineTransaction = createAsyncThunk(
  'transactions/decline',
  async (data, { rejectWithValue }) => {
    try {
      const response = await transactionService.decline(data)
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
    [getAllTransaction.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllTransaction.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllTransaction.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },

    [getOneTransaction.pending]: (state) => {
      state.loading = true
    },
    [getOneTransaction.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [getOneTransaction.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [approveTransaction.pending]: (state) => {
      state.loading = true
    },
    [approveTransaction.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [approveTransaction.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [declineTransaction.pending]: (state) => {
      state.loading = true
    },
    [declineTransaction.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [declineTransaction.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },
    [approveTransaction.pending]: (state) => {
      state.loading = true
    },
    [approveTransaction.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [approveTransaction.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },
  },
})

export const { resetSelectedPhysician } = slice.actions
export default slice.reducer

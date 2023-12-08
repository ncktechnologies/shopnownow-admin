import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { walletService } from '../services/walletService'

export const getAllWallet = createAsyncThunk(
  'wallet/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await walletService.getAll()
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const getOneWallet = createAsyncThunk(
  'wallet/getOne',
  async (data, { rejectWithValue }) => {
    try {
      const response = await walletService.getOne(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const approveWithdrawalRequest = createAsyncThunk(
  'wallet/approve',
  async (data, { rejectWithValue }) => {
    try {
      const response = await walletService.approve(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const declineWithdrawalRequest = createAsyncThunk(
  'wallet/decline',
  async (data, { rejectWithValue }) => {
    try {
      const response = await walletService.decline(data)
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
  name: 'wallet',
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
    [getAllWallet.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllWallet.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllWallet.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },

    [getOneWallet.pending]: (state) => {
      state.loading = true
    },
    [getOneWallet.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [getOneWallet.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [approveWithdrawalRequest.pending]: (state) => {
      state.loading = true
    },
    [approveWithdrawalRequest.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [approveWithdrawalRequest.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [declineWithdrawalRequest.pending]: (state) => {
      state.loading = true
    },
    [declineWithdrawalRequest.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [declineWithdrawalRequest.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },
    [approveWithdrawalRequest.pending]: (state) => {
      state.loading = true
    },
    [approveWithdrawalRequest.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [approveWithdrawalRequest.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },
  },
})

export const { resetSelectedPhysician } = slice.actions
export default slice.reducer

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { claimService } from '../services/claimService'

export const getAllClaims = createAsyncThunk('claim/getAll', async (_, { rejectWithValue }) => {
  try {
    const response = await claimService.getAll()
    return response.data
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

export const getOneClaim = createAsyncThunk('claim/getOne', async (data, { rejectWithValue }) => {
  try {
    const response = await claimService.getOne(data)
    return response.data
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

export const getPaidClaims = createAsyncThunk('claim/paid', async (_, { rejectWithValue }) => {
  try {
    const response = await claimService.getPaidClaims()
    return response.data
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

export const updateClaimStatus = createAsyncThunk(
  'claim/edit',
  async (data, { rejectWithValue }) => {
    try {
      const response = await claimService.updateClaimStatus(data)
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
  name: 'claim',
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
    [getAllClaims.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllClaims.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllClaims.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },

    [getOneClaim.pending]: (state) => {
      state.loading = true
    },
    [getOneClaim.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [getOneClaim.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [getPaidClaims.pending]: (state) => {
      state.loading = true
    },
    [getPaidClaims.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [getPaidClaims.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [updateClaimStatus.pending]: (state) => {
      state.loading = true
    },
    [updateClaimStatus.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [updateClaimStatus.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },
  },
})

export const { resetSingleData } = slice.actions
export default slice.reducer

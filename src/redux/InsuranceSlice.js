import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { InsuranceService } from '../services/InsuranceService'

export const getAllInsurances = createAsyncThunk(
  'insurance/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await InsuranceService.getAll()
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const getOneInsurance = createAsyncThunk(
  'insurance/getOne',
  async (data, { rejectWithValue }) => {
    try {
      const response = await InsuranceService.getOne(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const createInsurance = createAsyncThunk(
  'insurance/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await InsuranceService.createInsurance(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const editInsurance = createAsyncThunk(
  'insurance/edit',
  async (data, { rejectWithValue }) => {
    try {
      const response = await InsuranceService.editInsurance(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const deleteInsurance = createAsyncThunk(
  'insurance/delete',
  async (data, { rejectWithValue }) => {
    try {
      const response = await InsuranceService.deleteOne(data)
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
  name: 'insurance',
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
    [getAllInsurances.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllInsurances.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllInsurances.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },

    [getOneInsurance.pending]: (state) => {
      state.loading = true
    },
    [getOneInsurance.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [getOneInsurance.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [createInsurance.pending]: (state) => {
      state.loading = true
    },
    [createInsurance.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [createInsurance.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [editInsurance.pending]: (state) => {
      state.loading = true
    },
    [editInsurance.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [editInsurance.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [deleteInsurance.pending]: (state) => {
      state.loading = true
    },
    [deleteInsurance.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [deleteInsurance.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },
  },
})

export const { resetSingleData } = slice.actions
export default slice.reducer

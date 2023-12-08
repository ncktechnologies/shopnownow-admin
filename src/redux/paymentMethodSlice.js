import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { paymentMethodsService } from '../services/paymentMethods.service'




export const getAllPaymentMethods = createAsyncThunk(
  'paymentMethod/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await paymentMethodsService.getAll()
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const getOnePaymentMethod = createAsyncThunk(
  'paymentMethod/getOne',
  async (data, { rejectWithValue }) => {
    try {
      const response = await paymentMethodsService.getOne(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const createPaymentMethod = createAsyncThunk(
  'paymentMethod/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await paymentMethodsService.create(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const editPaymentMethod = createAsyncThunk(
  'paymentMethod/edit',
  async (data, { rejectWithValue }) => {
    try {
      const response = await paymentMethodsService.edit(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const deletePaymentMethod = createAsyncThunk(
  'paymentMethod/delete',
  async (data, { rejectWithValue }) => {
    try {
      const response = await paymentMethodsService.deleteOne(data)
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
    [getAllPaymentMethods.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllPaymentMethods.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllPaymentMethods.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },


    [getOnePaymentMethod.pending]: (state) => {
      state.loading = true
    },
    [getOnePaymentMethod.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [getOnePaymentMethod.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },


    [createPaymentMethod.pending]: (state) => {
      state.loading = true
    },
    [createPaymentMethod.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [createPaymentMethod.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },


    [editPaymentMethod.pending]: (state) => {
      state.loading = true
    },
    [editPaymentMethod.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [editPaymentMethod.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },


    [deletePaymentMethod.pending]: (state) => {
      state.loading = true
    },
    [deletePaymentMethod.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [deletePaymentMethod.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

  
  },
})

export const { resetSingleData } = slice.actions
export default slice.reducer

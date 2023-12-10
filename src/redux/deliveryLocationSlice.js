import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { deliveryLocationService } from '../services/deliveryLocationService'

export const getAllDeliveryLocations = createAsyncThunk(
  'deliveryLocation/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await deliveryLocationService.getAll()
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const getOneDeliveryLocation = createAsyncThunk(
  'deliveryLocation/getOne',
  async (data, { rejectWithValue }) => {
    try {
      const response = await deliveryLocationService.getOne(data)
      return response
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const createDeliveryLocation = createAsyncThunk(
  'deliveryLocation/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await deliveryLocationService.createDeliveryLocation(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const editDeliveryLocation = createAsyncThunk('deliveryLocation/edit', async (data, { rejectWithValue }) => {
  try {
    const response = await deliveryLocationService.editDeliveryLocation(data)
    return response.data
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

export const deleteDeliveryLocation = createAsyncThunk(
    'deliveryLocation/delete',
    async (data, { rejectWithValue }) => {
      try {
        const response = await deliveryLocationService.deleteDeliveryLocation(data)
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
  name: 'deliveryLocation',
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
    [getAllDeliveryLocations.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllDeliveryLocations.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllDeliveryLocations.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },

    [getOneDeliveryLocation.pending]: (state) => {
      state.loading = true
    },
    [getOneDeliveryLocation.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [getOneDeliveryLocation.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [createDeliveryLocation.pending]: (state) => {
      state.loading = true
    },
    [createDeliveryLocation.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [createDeliveryLocation.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [editDeliveryLocation.pending]: (state) => {
      state.loading = true
    },
    [editDeliveryLocation.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [editDeliveryLocation.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },
    [deleteDeliveryLocation.pending]: (state) => {
        state.loading = true
      },
      [deleteDeliveryLocation.fulfilled]: (state, { payload }) => {
        state.message = payload?.message
        state.loading = false
      },
      [deleteDeliveryLocation.rejected]: (state, { payload }) => {
        state.error = true
        state.message = payload
        state.loading = false
      },
   
  },
})

export const { resetSingleData } = slice.actions
export default slice.reducer

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { orderService } from '../services/orderService'

export const getAllOrders = createAsyncThunk('order/getAll', async (_, { rejectWithValue }) => {
  try {
    const response = await orderService.getAll()
    return response
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

export const getOneOrder = createAsyncThunk('order/getOne', async (data, { rejectWithValue }) => {
  try {
    const response = await orderService.getOne(data)
    return response
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

export const updateStatus = createAsyncThunk(
  "order/updateStatus",
  async (data, { rejectWithValue }) => {
    try {
      const response = await orderService.updateStatus(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);


export const deleteOrder = createAsyncThunk(
  'order/delete',
  async (data, { rejectWithValue }) => {
    try {
      const response = await orderService.deleteOne(data)
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
  name: 'order',
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
    [getAllOrders.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllOrders.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllOrders.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },

    [getOneOrder.pending]: (state) => {
      state.loading = true
    },
    [getOneOrder.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [getOneOrder.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },
    [deleteOrder.pending]: (state) => {
      state.loading = true
    },
    [deleteOrder.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [deleteOrder.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },
    [updateStatus.pending]: (state) => {
      state.loading = true
    },
    [updateStatus.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [updateStatus.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },
  },
})

export const { resetSingleData } = slice.actions
export default slice.reducer

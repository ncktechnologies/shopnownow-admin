import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { couponService } from '../services/couponService'

export const getAllCoupons = createAsyncThunk(
  'coupon/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await couponService.getAll()
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const getOneCoupon = createAsyncThunk(
  'coupon/getOne',
  async (data, { rejectWithValue }) => {
    try {
      const response = await couponService.getOne(data)
      return response
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const createCoupon = createAsyncThunk(
  'coupon/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await couponService.createCoupon(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)


export const editCoupon = createAsyncThunk('coupon/edit', async (data, { rejectWithValue }) => {
  try {
    const response = await couponService.editCoupon(data)
    return response.data
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

export const deleteCoupon = createAsyncThunk(
  'coupon/delete',
  async (data, { rejectWithValue }) => {
    try {
      const response = await couponService.deleteOne(data)
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
  name: 'coupon',
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
    [getAllCoupons.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllCoupons.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllCoupons.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },

    [getOneCoupon.pending]: (state) => {
      state.loading = true
    },
    [getOneCoupon.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [getOneCoupon.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [createCoupon.pending]: (state) => {
      state.loading = true
    },
    [createCoupon.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [createCoupon.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [deleteCoupon.pending]: (state) => {
      state.loading = true
    },
    [deleteCoupon.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [deleteCoupon.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [editCoupon.pending]: (state) => {
      state.loading = true
    },
    [editCoupon.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [editCoupon.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

   
  },
})

export const { resetSingleData } = slice.actions
export default slice.reducer

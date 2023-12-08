import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { productService } from '../services/productService'

export const getTopRatedProduct = createAsyncThunk(
  'product/getTopRatedProduct',
  async (data, { rejectWithValue }) => {
    try {
      const response = await productService.getTopRatedProduct(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)


export const getOneProduct = createAsyncThunk(
    'product/getOne',
    async (data, { rejectWithValue }) => {
      try {
        const response = await productService.getOne(data)
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
  name: 'top',
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
    [getTopRatedProduct.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getTopRatedProduct.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getTopRatedProduct.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },

    [getOneProduct.pending]: (state) => {
        state.loading = true
      },
      [getOneProduct.fulfilled]: (state, { payload }) => {
        state.message = payload?.message
        state.loading = false
        state.singleData = payload
      },
      [getOneProduct.rejected]: (state, { payload }) => {
        state.error = true
        state.message = payload
        state.loading = false
      },
  

  },
})

export const { resetSingleData } = slice.actions
export default slice.reducer

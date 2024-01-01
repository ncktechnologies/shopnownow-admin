import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { productService } from '../services/productService'


export const getAllProducts = createAsyncThunk('product/getAll', async (page, { rejectWithValue }) => {
  try {
    const response = await productService.getAll(page);
    return response;
  } catch (error) {
    return rejectWithValue(error?.response?.data);
  }
});

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


export const createProduct = createAsyncThunk(
  'product/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await productService.create(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const filterProduct = createAsyncThunk(
  'product/filter',
  async (data, { rejectWithValue }) => {
    try {
      const response = await productService.filter(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const editProduct = createAsyncThunk('product/edit', async (data, { rejectWithValue }) => {
  try {
    const response = await productService.edit(data)
    return response.data
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

export const deleteProduct = createAsyncThunk(
  'product/delete',
  async (data, { rejectWithValue }) => {
    try {
      const response = await productService.deleteOne(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const hideShowProduct = createAsyncThunk(
  'product/hideShowProduct',
  async (data, { rejectWithValue }) => {
    try {
      const response = await productService.hideShowProduct(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const createRelatedProduct = createAsyncThunk(
  'relatedProduct/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await productService.addRelatedProduct(data)
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
    [getAllProducts.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllProducts.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllProducts.rejected]: (state, action) => {
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

    [createProduct.pending]: (state) => {
      state.loading = true
    },
    [createProduct.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [createProduct.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },
    [filterProduct.pending]: (state) => {
      state.loading = true
    },
    [filterProduct.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [filterProduct.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [editProduct.pending]: (state) => {
      state.loading = true
    },
    [editProduct.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [editProduct.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [deleteProduct.pending]: (state) => {
      state.loading = true
    },
    [deleteProduct.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [deleteProduct.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [createRelatedProduct.pending]: (state) => {
      state.loading = true
    },
    [createRelatedProduct.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [createRelatedProduct.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },


    [hideShowProduct.pending]: (state) => {
      state.loading = true
    },
    [hideShowProduct.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [hideShowProduct.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },
  },
})

export const { resetSingleData } = slice.actions
export default slice.reducer

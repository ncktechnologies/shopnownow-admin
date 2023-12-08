import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CategoryService } from '../services/CategoryService'

export const getAllCategories = createAsyncThunk(
  'category/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await CategoryService.getAll()
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const getOneCategory = createAsyncThunk(
  'category/getOne',
  async (data, { rejectWithValue }) => {
    try {
      const response = await CategoryService.getOne(data)
      return response
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const createCategory = createAsyncThunk(
  'category/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await CategoryService.createCategory(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const editCategory = createAsyncThunk('category/edit', async (data, { rejectWithValue }) => {
  try {
    const response = await CategoryService.editCategory(data)
    return response.data
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

export const deleteCategory = createAsyncThunk(
  'category/delete',
  async (data, { rejectWithValue }) => {
    try {
      const response = await CategoryService.deleteOne(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const hideShowCategory = createAsyncThunk(
  'category/hideShowCategory',
  async (data, { rejectWithValue }) => {
    try {
      const response = await CategoryService.hideShowCategory(data)
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
  name: 'category',
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
    [getAllCategories.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllCategories.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllCategories.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },

    [getOneCategory.pending]: (state) => {
      state.loading = true
    },
    [getOneCategory.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [getOneCategory.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [createCategory.pending]: (state) => {
      state.loading = true
    },
    [createCategory.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [createCategory.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [editCategory.pending]: (state) => {
      state.loading = true
    },
    [editCategory.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [editCategory.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [deleteCategory.pending]: (state) => {
      state.loading = true
    },
    [deleteCategory.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [deleteCategory.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [hideShowCategory.pending]: (state) => {
      state.loading = true
    },
    [hideShowCategory.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [hideShowCategory.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },
  },
})

export const { resetSingleData } = slice.actions
export default slice.reducer

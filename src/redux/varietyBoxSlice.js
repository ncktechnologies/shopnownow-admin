import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { varietyBoxService } from '../services/VarietyBoxService'

export const getAllVarietyBoxes = createAsyncThunk(
  'varietyBox/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await varietyBoxService.getAll()
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const getOneVarietyBox = createAsyncThunk(
  'varietyBox/getOne',
  async (data, { rejectWithValue }) => {
    try {
      const response = await varietyBoxService.getOne(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const createVarietyBox = createAsyncThunk(
  'varietyBox/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await varietyBoxService.create(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const editVarietyBox = createAsyncThunk(
  'varietyBox/edit',
  async (data, { rejectWithValue }) => {
    try {
      const response = await varietyBoxService.edit(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const deleteVarietyBox = createAsyncThunk(
  'varietyBox/delete',
  async (data, { rejectWithValue }) => {
    try {
      const response = await varietyBoxService.deleteOne(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const addItemsToVarietyBox = createAsyncThunk(
  'varietyBoxItems/add',
  async (data, { rejectWithValue }) => {
    try {
      const response = await varietyBoxService.addProductToVarietyBox(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const getVarietyBoxCategory = createAsyncThunk(
  'varietyBox/getCategory',
  async (data, { rejectWithValue }) => {
    try {
      const response = await varietyBoxService.varietyBoxCategory()
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
  name: 'varietyBox',
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
    [getAllVarietyBoxes.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllVarietyBoxes.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllVarietyBoxes.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },

    [getOneVarietyBox.pending]: (state) => {
      state.loading = true
    },
    [getOneVarietyBox.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [getOneVarietyBox.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [createVarietyBox.pending]: (state) => {
      state.loading = true
    },
    [createVarietyBox.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [createVarietyBox.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [editVarietyBox.pending]: (state) => {
      state.loading = true
    },
    [editVarietyBox.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [editVarietyBox.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [deleteVarietyBox.pending]: (state) => {
      state.loading = true
    },
    [deleteVarietyBox.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [deleteVarietyBox.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [addItemsToVarietyBox.pending]: (state) => {
      state.loading = true
    },
    [addItemsToVarietyBox.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [addItemsToVarietyBox.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [getVarietyBoxCategory.pending]: (state) => {
      state.loading = true
    },
    [getVarietyBoxCategory.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [getVarietyBoxCategory.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },
  },
})

export const { resetSingleData } = slice.actions
export default slice.reducer

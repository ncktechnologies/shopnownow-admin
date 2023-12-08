import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { serviceCategoryService } from '../services/serviceCategory.service'



export const getAllServiceCategory = createAsyncThunk(
  'serviceCategory/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await serviceCategoryService.getAll()
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const getOneServiceCategory = createAsyncThunk(
  'serviceCategory/getOne',
  async (data, { rejectWithValue }) => {
    try {
      const response = await serviceCategoryService.getOne(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const createServiceCategory = createAsyncThunk(
  'serviceCategory/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await serviceCategoryService.create(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const editServiceCategory = createAsyncThunk(
  'serviceCategory/edit',
  async (data, { rejectWithValue }) => {
    try {
      const response = await serviceCategoryService.edit(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const deleteServiceCategory = createAsyncThunk(
  'serviceCategory/delete',
  async (data, { rejectWithValue }) => {
    try {
      const response = await serviceCategoryService.deleteOne(data)
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
    [getAllServiceCategory.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllServiceCategory.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllServiceCategory.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },


    [getOneServiceCategory.pending]: (state) => {
      state.loading = true
    },
    [getOneServiceCategory.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [getOneServiceCategory.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },


    [createServiceCategory.pending]: (state) => {
      state.loading = true
    },
    [createServiceCategory.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [createServiceCategory.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },


    [editServiceCategory.pending]: (state) => {
      state.loading = true
    },
    [editServiceCategory.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [editServiceCategory.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },


    [deleteServiceCategory.pending]: (state) => {
      state.loading = true
    },
    [deleteServiceCategory.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [deleteServiceCategory.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

  
  },
})

export const { resetSingleData } = slice.actions
export default slice.reducer

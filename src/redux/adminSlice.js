import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { adminService } from '../services/adminService'

export const getAllAdmin = createAsyncThunk(
  'admin/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminService.getAll()
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const getOneAdmin = createAsyncThunk(
  'admin/getOne',
  async (data, { rejectWithValue }) => {
    try {
      const response = await adminService.getOne(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const createAdmin = createAsyncThunk(
  'admin/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await adminService.createAdmin(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)


export const deleteAdmin = createAsyncThunk(
  'notification/delete',
  async (data, { rejectWithValue }) => {
    try {
      const response = await adminService.deleteOne(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const activateAdmin = createAsyncThunk(
  'admin/activateAdmin',
  async (data, { rejectWithValue }) => {
    try {
      const response = await adminService.activateAdmin(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const deactivateAdmin = createAsyncThunk(
  'admin/deactivateAdmin',
  async (data, { rejectWithValue }) => {
    try {
      const response = await adminService.deactivateAdmin(data)
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
  name: 'admin',
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
    [getAllAdmin.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllAdmin.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllAdmin.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },

    [getOneAdmin.pending]: (state) => {
      state.loading = true
    },
    [getOneAdmin.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [getOneAdmin.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [createAdmin.pending]: (state) => {
      state.loading = true
    },
    [createAdmin.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [createAdmin.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [deleteAdmin.pending]: (state) => {
      state.loading = true
    },
    [deleteAdmin.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [deleteAdmin.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },
    [activateAdmin.pending]: (state) => {
      state.loading = true
    },
    [activateAdmin.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [activateAdmin.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [deactivateAdmin.pending]: (state) => {
      state.loading = true
    },
    [deactivateAdmin.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [deactivateAdmin.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },
  },
})

export const { resetSingleData } = slice.actions
export default slice.reducer

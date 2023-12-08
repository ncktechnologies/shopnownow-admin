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

export const editAdmin = createAsyncThunk(
  'notification/edit',
  async (data, { rejectWithValue }) => {
    try {
      const response = await adminService.editAdmin(data)
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

    [editAdmin.pending]: (state) => {
      state.loading = true
    },
    [editAdmin.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [editAdmin.rejected]: (state, { payload }) => {
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
  },
})

export const { resetSingleData } = slice.actions
export default slice.reducer

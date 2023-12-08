import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { CompanyService } from '../services/CompanyService.js'

export const getAllCompanies = createAsyncThunk(
  'company/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await CompanyService.getAll()
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const getOneCompany = createAsyncThunk(
  'company/getOne',
  async (data, { rejectWithValue }) => {
    try {
      const response = await CompanyService.getOne(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const createCompany = createAsyncThunk(
  'company/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await CompanyService.createCompany(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const editCompany = createAsyncThunk('company/edit', async (data, { rejectWithValue }) => {
  try {
    const response = await CompanyService.editCompany(data)
    return response.data
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

export const deleteCompany = createAsyncThunk(
  'company/delete',
  async (data, { rejectWithValue }) => {
    try {
      const response = await CompanyService.deleteOne(data)
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
    [getAllCompanies.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllCompanies.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllCompanies.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },

    [getOneCompany.pending]: (state) => {
      state.loading = true
    },
    [getOneCompany.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [getOneCompany.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [createCompany.pending]: (state) => {
      state.loading = true
    },
    [createCompany.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [createCompany.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [editCompany.pending]: (state) => {
      state.loading = true
    },
    [editCompany.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [editCompany.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [deleteCompany.pending]: (state) => {
      state.loading = true
    },
    [deleteCompany.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [deleteCompany.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },
  },
})

export const { resetSingleData } = slice.actions
export default slice.reducer

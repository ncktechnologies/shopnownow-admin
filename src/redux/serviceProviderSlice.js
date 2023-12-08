import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { serviceProviderService } from '../services/serviceProvider.service'



export const getAllServiceProviders = createAsyncThunk(
  'serviceProviders/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await serviceProviderService.getAll()
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const getOneServiceProviders = createAsyncThunk(
  'serviceProviders/getOne',
  async (data, { rejectWithValue }) => {
    try {
      const response = await serviceProviderService.getOne(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const getServiceProvidersByCategory = createAsyncThunk(
  'serviceProviders/getByStatus',
  async (data, { rejectWithValue }) => {
    try {
      const response = await serviceProviderService.getByCategory(data)
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
    [getAllServiceProviders.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllServiceProviders.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllServiceProviders.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },


    [getOneServiceProviders.pending]: (state) => {
      state.loading = true
    },
    [getOneServiceProviders.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [getOneServiceProviders.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [getServiceProvidersByCategory.pending] : state =>{
        state.loading = true
    },
    [getServiceProvidersByCategory.fulfilled] : (state, {payload}) =>{
        state.loading = false
        state.data = payload.data
      state.message = payload?.message
    },
    [getServiceProvidersByCategory.rejected]: (state, { payload }) => {
        state.error = true
        state.message = payload
        state.loading = false
      },
  },
})

export const { resetSingleData } = slice.actions
export default slice.reducer

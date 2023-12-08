import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { pricingparameterService } from '../services/pricingparameterService'

export const getAllPricingParameters = createAsyncThunk(
  'pricingparameter/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await pricingparameterService.getAll()
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const getOnePricingParameter = createAsyncThunk(
  'pricingparameter/getOne',
  async (data, { rejectWithValue }) => {
    try {
      const response = await pricingparameterService.getOne(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const createPricingParameter = createAsyncThunk(
  'pricingparameter/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await pricingparameterService.createPricingParameter(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const editPricingParameter = createAsyncThunk(
  'pricingparameter/edit',
  async (data, { rejectWithValue }) => {
    try {
      const response = await pricingparameterService.editPricingParameter(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

// export const deleteHub = createAsyncThunk(
//   'pricingparameter/delete',
//   async (data, { rejectWithValue }) => {
//     try {
//       const response = await pricingparameterService.deleteOne(data)
//       return response.data
//     } catch (error) {
//       return rejectWithValue(error?.response?.data)
//     }
//   },
// )

const initialState = {
  data: [],
  singleData: {},
  loading: false,
  error: false,
  message: '',
}

const slice = createSlice({
  name: 'pricing',
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
    [getAllPricingParameters.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllPricingParameters.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllPricingParameters.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },

    [getOnePricingParameter.pending]: (state) => {
      state.loading = true
    },
    [getOnePricingParameter.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [getOnePricingParameter.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [createPricingParameter.pending]: (state) => {
      state.loading = true
    },
    [createPricingParameter.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [createPricingParameter.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [editPricingParameter.pending]: (state) => {
      state.loading = true
    },
    [editPricingParameter.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [editPricingParameter.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    // [deleteHub.pending]: (state) => {
    //   state.loading = true
    // },
    // [deleteHub.fulfilled]: (state, { payload }) => {
    //   state.message = payload?.message
    //   state.loading = false
    // },
    // [deleteHub.rejected]: (state, { payload }) => {
    //   state.error = true
    //   state.message = payload
    //   state.loading = false
    // },
  },
})

export const { resetSingleData } = slice.actions
export default slice.reducer

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { specialRequestService } from '../services/specialRequestService'

export const getAllSpecialRequests = createAsyncThunk('specialRequest/getAll', async (_, { rejectWithValue }) => {
  try {
    const response = await specialRequestService.getAll()
    return response
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

export const getOneSpecialRequest = createAsyncThunk('specialRequest/getOne', async (data, { rejectWithValue }) => {
  try {
    const response = await specialRequestService.getOne(data)
    return response
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})



export const deleteSpecialRequest = createAsyncThunk(
  'specialRequest/delete',
  async (data, { rejectWithValue }) => {
    try {
      const response = await specialRequestService.deleteOne(data)
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
  name: 'special_requests',
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
    [getAllSpecialRequests.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllSpecialRequests.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllSpecialRequests.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },

    [getOneSpecialRequest.pending]: (state) => {
      state.loading = true
    },
    [getOneSpecialRequest.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [getOneSpecialRequest.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },
    [deleteSpecialRequest.pending]: (state) => {
      state.loading = true
    },
    [deleteSpecialRequest.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [deleteSpecialRequest.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },
   
  },
})

export const { resetSingleData } = slice.actions
export default slice.reducer

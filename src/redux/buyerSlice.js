import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userService } from '../services/userService'


export const getAllBuyers = createAsyncThunk('buyer/getAllBuyers', async (data, { rejectWithValue }) => {
  try {
    const response = await userService.getAllBuyers(data)
    return response.data
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

const initialState = {
  data: [],
  singleData: {},
  loading: false,
  error: false,
  message: '',
}

const slice = createSlice({
  name: 'buyer',
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


    [getAllBuyers.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllBuyers.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllBuyers.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },


  },
})



export const { resetSingleData } = slice.actions
export default slice.reducer

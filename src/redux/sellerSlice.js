import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userService } from '../services/userService'


export const getAllSellers = createAsyncThunk('seller/getAllSellers', async (data, { rejectWithValue }) => {
  try {
    const response = await userService.getAllSellers(data)
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
  name: 'seller',
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


    [getAllSellers.pending]: (state) => {
        if (state.data.length <= 0) {
          state.loading = true
        }
      },
      [getAllSellers.fulfilled]: (state, action) => {
        state.error = false
        state.data = action.payload
        state.loading = false
      },
      [getAllSellers.rejected]: (state, action) => {
        state.error = true
        state.message = action.payload
        state.loading = false
      },


  },
})



export const { resetSingleData } = slice.actions
export default slice.reducer

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userService } from '../services/userService'

export const getAllUsers = createAsyncThunk('user/getAll', async (_, { rejectWithValue }) => {
  try {
    const response = await userService.getAll()
    return response
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

export const getOneUser = createAsyncThunk('user/getOne', async (data, { rejectWithValue }) => {
  try {
    const response = await userService.getOne(data)
    return response
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
  name: 'user',
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
    [getAllUsers.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllUsers.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },

    [getOneUser.pending]: (state) => {
      state.loading = true
    },
    [getOneUser.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [getOneUser.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

  },
})



export const { resetSingleData } = slice.actions
export default slice.reducer

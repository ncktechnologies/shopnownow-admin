import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { chatService } from '../services/chatService'

export const getAllChats = createAsyncThunk(
  'chat/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await chatService.getAll()
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const getOneChat = createAsyncThunk(
  'chat/getOne',
  async (data, { rejectWithValue }) => {
    try {
      const response = await chatService.getOne(data)
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
  name: 'chat',
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
    [getAllChats.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllChats.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllChats.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },

    [getOneChat.pending]: (state) => {
      state.loading = true
    },
    [getOneChat.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [getOneChat.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    
  },
})

export const { resetSingleData } = slice.actions
export default slice.reducer

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { notificationService } from '../services/notificationService'

export const getAllNotifications = createAsyncThunk(
  'notification/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await notificationService.getAll()
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const getOneNotification = createAsyncThunk(
  'notification/getOne',
  async (data, { rejectWithValue }) => {
    try {
      const response = await notificationService.getOne(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const sendToAllUsers = createAsyncThunk(
  'sendtoall/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await notificationService.sendToAllUsers(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const sendToOneUser = createAsyncThunk(
  'sendtoone/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await notificationService.sendToOneUser(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)
export const sendToMultipleUsers = createAsyncThunk(
    'sendtomultiple/create',
    async (data, { rejectWithValue }) => {
      try {
        const response = await notificationService.sendToMultipleUsers(data)
        return response.data
      } catch (error) {
        return rejectWithValue(error?.response?.data)
      }
    },
  )

export const editNotification = createAsyncThunk(
  'notification/edit',
  async (data, { rejectWithValue }) => {
    try {
      const response = await notificationService.editNotification(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const deleteNotification = createAsyncThunk(
  'notification/delete',
  async (data, { rejectWithValue }) => {
    try {
      const response = await notificationService.deleteOne(data)
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
    [getAllNotifications.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllNotifications.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllNotifications.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },

    [getOneNotification.pending]: (state) => {
      state.loading = true
    },
    [getOneNotification.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [getOneNotification.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [sendToAllUsers.pending]: (state) => {
      state.loading = true
    },
    [sendToAllUsers.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [sendToAllUsers.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [sendToOneUser.pending]: (state) => {
      state.loading = true
    },
    [sendToOneUser.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [sendToOneUser.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [sendToMultipleUsers.pending]: (state) => {
        state.loading = true
      },
      [sendToMultipleUsers.fulfilled]: (state, { payload }) => {
        state.message = payload?.message
        state.loading = false
      },
      [sendToMultipleUsers.rejected]: (state, { payload }) => {
        state.error = true
        state.message = payload
        state.loading = false
      },

    [editNotification.pending]: (state) => {
      state.loading = true
    },
    [editNotification.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [editNotification.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [deleteNotification.pending]: (state) => {
      state.loading = true
    },
    [deleteNotification.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [deleteNotification.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },
  },
})

export const { resetSingleData } = slice.actions
export default slice.reducer
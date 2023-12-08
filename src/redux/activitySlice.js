import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { activityService } from '../services/activityService'

export const getAllActivities = createAsyncThunk(
  'activity/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await activityService.getAll()
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const getOneActivity = createAsyncThunk(
  'activity/getOne',
  async (data, { rejectWithValue }) => {
    try {
      const response = await activityService.getOne(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const createGlobalActivity = createAsyncThunk(
  'activity/global/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await activityService.createGlobalActivity(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const editGlobalActivity = createAsyncThunk(
  'activity/global/edit',
  async (data, { rejectWithValue }) => {
    try {
      const response = await activityService.editGlobalActivity(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const createIndividualActivity = createAsyncThunk(
  'activity/individual/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await activityService.createIndividualActivity(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const editIndividualUserActivity = createAsyncThunk(
  'activity/individual/edit',
  async (data, { rejectWithValue }) => {
    try {
      const response = await activityService.editIndividualUserActivity(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const deleteOneActivity = createAsyncThunk(
  'activity/delete',
  async (data, { rejectWithValue }) => {
    try {
      const response = await activityService.deleteOne(data)
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
    [getAllActivities.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllActivities.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllActivities.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },

    [getOneActivity.pending]: (state) => {
      state.loading = true
    },
    [getOneActivity.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [getOneActivity.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [createGlobalActivity.pending]: (state) => {
      state.loading = true
    },
    [createGlobalActivity.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [createGlobalActivity.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [editGlobalActivity.pending]: (state) => {
      state.loading = true
    },
    [editGlobalActivity.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [editGlobalActivity.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [createIndividualActivity.pending]: (state) => {
      state.loading = true
    },
    [createIndividualActivity.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [createIndividualActivity.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [editIndividualUserActivity.pending]: (state) => {
      state.loading = true
    },
    [editIndividualUserActivity.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [editIndividualUserActivity.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [deleteOneActivity.pending]: (state) => {
      state.loading = true
    },
    [deleteOneActivity.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [deleteOneActivity.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },
  },
})

export const { resetSingleData } = slice.actions
export default slice.reducer

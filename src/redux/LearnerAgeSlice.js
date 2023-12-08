import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { learnerAgeService } from '../services/learnerAgeService'

export const getAllLearnerAges = createAsyncThunk(
  'learnerage/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await learnerAgeService.getAll()
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const getOneLearnerAge = createAsyncThunk(
  'learnerage/getOne',
  async (data, { rejectWithValue }) => {
    try {
      const response = await learnerAgeService.getOne(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const createLearnerAge = createAsyncThunk(
  'learnerage/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await learnerAgeService.createLearnerAge(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const editLearnerAge = createAsyncThunk(
  'learnerage/edit',
  async (data, { rejectWithValue }) => {
    try {
      const response = await learnerAgeService.editLearnerAge(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const deleteLearnerAge = createAsyncThunk(
  'learnerage/delete',
  async (data, { rejectWithValue }) => {
    try {
      const response = await learnerAgeService.deleteOne(data)
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
    [getAllLearnerAges.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllLearnerAges.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllLearnerAges.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },

    [getOneLearnerAge.pending]: (state) => {
      state.loading = true
    },
    [getOneLearnerAge.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [getOneLearnerAge.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [createLearnerAge.pending]: (state) => {
      state.loading = true
    },
    [createLearnerAge.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [createLearnerAge.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [editLearnerAge.pending]: (state) => {
      state.loading = true
    },
    [editLearnerAge.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [editLearnerAge.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [deleteLearnerAge.pending]: (state) => {
      state.loading = true
    },
    [deleteLearnerAge.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [deleteLearnerAge.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },
  },
})

export const { resetSingleData } = slice.actions
export default slice.reducer

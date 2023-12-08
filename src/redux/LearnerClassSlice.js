import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { learnerClassService } from '../services/learnerClassService'

export const getAllLearnerclasses = createAsyncThunk(
  'learnerclass/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await learnerClassService.getAll()
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const getOneLearnerclass = createAsyncThunk(
  'learnerclass/getOne',
  async (data, { rejectWithValue }) => {
    try {
      const response = await learnerClassService.getOne(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const createLearnerclass = createAsyncThunk(
  'learnerclass/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await learnerClassService.createLearnerclass(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const editLearnerclass = createAsyncThunk(
  'learnerclass/edit',
  async (data, { rejectWithValue }) => {
    try {
      const response = await learnerClassService.editLearnerclass(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const deleteLearnerClass = createAsyncThunk(
  'learnerclass/delete',
  async (data, { rejectWithValue }) => {
    try {
      const response = await learnerClassService.deleteOne(data)
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
    [getAllLearnerclasses.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllLearnerclasses.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllLearnerclasses.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },

    [getOneLearnerclass.pending]: (state) => {
      state.loading = true
    },
    [getOneLearnerclass.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [getOneLearnerclass.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [createLearnerclass.pending]: (state) => {
      state.loading = true
    },
    [createLearnerclass.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [createLearnerclass.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [editLearnerclass.pending]: (state) => {
      state.loading = true
    },
    [editLearnerclass.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [editLearnerclass.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [deleteLearnerClass.pending]: (state) => {
      state.loading = true
    },
    [deleteLearnerClass.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [deleteLearnerClass.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },
  },
})

export const { resetSingleData } = slice.actions
export default slice.reducer

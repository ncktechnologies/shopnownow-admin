import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { lessonService } from '../services/lessonService'

export const getAllLessons = createAsyncThunk('lesson/getAll', async (_, { rejectWithValue }) => {
  try {
    const response = await lessonService.getAll()
    return response.data
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

export const getOneLesson = createAsyncThunk('lesson/getOne', async (data, { rejectWithValue }) => {
  try {
    const response = await lessonService.getOne(data)
    return response.data
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

export const createLesson = createAsyncThunk('lesson/create', async (data, { rejectWithValue }) => {
  try {
    const response = await lessonService.createLesson(data)
    return response.data
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

export const editLesson = createAsyncThunk('lesson/edit', async (data, { rejectWithValue }) => {
  try {
    const response = await lessonService.editLesson(data)
    return response.data
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

export const deleteLesson = createAsyncThunk('lesson/delete', async (data, { rejectWithValue }) => {
  try {
    const response = await lessonService.deleteOne(data)
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
  name: 'lesson',
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
    [getAllLessons.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllLessons.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllLessons.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },

    [getOneLesson.pending]: (state) => {
      state.loading = true
    },
    [getOneLesson.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [getOneLesson.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [createLesson.pending]: (state) => {
      state.loading = true
    },
    [createLesson.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [createLesson.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [editLesson.pending]: (state) => {
      state.loading = true
    },
    [editLesson.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [editLesson.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [deleteLesson.pending]: (state) => {
      state.loading = true
    },
    [deleteLesson.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [deleteLesson.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },
  },
})

export const { resetSingleData } = slice.actions
export default slice.reducer

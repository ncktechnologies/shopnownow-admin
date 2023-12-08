import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { courseService } from '../services/courseService'

export const getAllCourses = createAsyncThunk('course/getAll', async (_, { rejectWithValue }) => {
  try {
    const response = await courseService.getAll()
    return response.data
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

export const getOneCourse = createAsyncThunk('course/getOne', async (data, { rejectWithValue }) => {
  try {
    const response = await courseService.getOne(data)
    return response.data
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

export const createCourse = createAsyncThunk('course/create', async (data, { rejectWithValue }) => {
  try {
    const response = await courseService.createCourse(data)
    return response.data
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

export const editCourse = createAsyncThunk('course/edit', async (data, { rejectWithValue }) => {
  try {
    const response = await courseService.editCourse(data)
    return response.data
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

export const deleteCourse = createAsyncThunk('course/delete', async (data, { rejectWithValue }) => {
  try {
    const response = await courseService.deleteOne(data)
    return response.data
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

export const addCourseContent = createAsyncThunk(
  'courscontent/add',
  async (data, { rejectWithValue }) => {
    try {
      const response = await courseService.addCourseContent(data)
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
    [getAllCourses.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllCourses.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllCourses.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },

    [getOneCourse.pending]: (state) => {
      state.loading = true
    },
    [getOneCourse.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [getOneCourse.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [createCourse.pending]: (state) => {
      state.loading = true
    },
    [createCourse.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [createCourse.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [editCourse.pending]: (state) => {
      state.loading = true
    },
    [editCourse.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [editCourse.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [deleteCourse.pending]: (state) => {
      state.loading = true
    },
    [deleteCourse.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [deleteCourse.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [addCourseContent.pending]: (state) => {
      state.loading = true
    },
    [addCourseContent.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [addCourseContent.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },
  },
})

export const { resetSingleData } = slice.actions
export default slice.reducer

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { subjectService } from '../services/subjectService'

export const getAllSubjects = createAsyncThunk('subject/getAll', async (_, { rejectWithValue }) => {
  try {
    const response = await subjectService.getAll()
    return response.data
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

export const getOneSubject = createAsyncThunk(
  'subject/getOne',
  async (data, { rejectWithValue }) => {
    try {
      const response = await subjectService.getOne(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const createSubject = createAsyncThunk(
  'subject/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await subjectService.createSubject(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const editSubject = createAsyncThunk('subject/edit', async (data, { rejectWithValue }) => {
  try {
    const response = await subjectService.editSubject(data)
    return response.data
  } catch (error) {
    return rejectWithValue(error?.response?.data)
  }
})

export const deleteSubject = createAsyncThunk(
  'subject/delete',
  async (data, { rejectWithValue }) => {
    try {
      const response = await subjectService.deleteOne(data)
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
    [getAllSubjects.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllSubjects.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllSubjects.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },

    [getOneSubject.pending]: (state) => {
      state.loading = true
    },
    [getOneSubject.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [getOneSubject.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [createSubject.pending]: (state) => {
      state.loading = true
    },
    [createSubject.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [createSubject.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [editSubject.pending]: (state) => {
      state.loading = true
    },
    [editSubject.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [editSubject.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [deleteSubject.pending]: (state) => {
      state.loading = true
    },
    [deleteSubject.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [deleteSubject.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },
  },
})

export const { resetSingleData } = slice.actions
export default slice.reducer

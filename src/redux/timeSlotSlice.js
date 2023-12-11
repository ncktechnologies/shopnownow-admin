import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { timeSlotService } from '../services/timeSlotService'

export const getAllTimeSlots = createAsyncThunk(
  'timeSlot/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await timeSlotService.getAll()
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const getOneTimeSlot = createAsyncThunk(
  'timeSlot/getOne',
  async (data, { rejectWithValue }) => {
    try {
      const response = await timeSlotService.getOne(data)
      return response
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const createTimeSlot = createAsyncThunk(
  'timeSlot/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await timeSlotService.createTimeSlot(data)
      return response.data
    } catch (error) {
      return rejectWithValue(error?.response?.data)
    }
  },
)

export const hideTimeSlot = createAsyncThunk(
    'timeSlot/hideShowTimeSlot',
    async (data, { rejectWithValue }) => {
      try {
        const response = await timeSlotService.hideShowTimeSlot(data)
        return response.data
      } catch (error) {
        return rejectWithValue(error?.response?.data)
      }
    },
  )

  export const showTimeSlot = createAsyncThunk(
    'timeSlot/hideShowTimeSlot',
    async (data, { rejectWithValue }) => {
      try {
        const response = await timeSlotService.hideShowTimeSlot(data)
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
  name: 'timeslot',
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
    [getAllTimeSlots.pending]: (state) => {
      if (state.data.length <= 0) {
        state.loading = true
      }
    },
    [getAllTimeSlots.fulfilled]: (state, action) => {
      state.error = false
      state.data = action.payload
      state.loading = false
    },
    [getAllTimeSlots.rejected]: (state, action) => {
      state.error = true
      state.message = action.payload
      state.loading = false
    },

    [getOneTimeSlot.pending]: (state) => {
      state.loading = true
    },
    [getOneTimeSlot.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
      state.singleData = payload
    },
    [getOneTimeSlot.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [createTimeSlot.pending]: (state) => {
      state.loading = true
    },
    [createTimeSlot.fulfilled]: (state, { payload }) => {
      state.message = payload?.message
      state.loading = false
    },
    [createTimeSlot.rejected]: (state, { payload }) => {
      state.error = true
      state.message = payload
      state.loading = false
    },

    [showTimeSlot.pending]: (state) => {
        state.loading = true
      },
      [showTimeSlot.fulfilled]: (state, { payload }) => {
        state.message = payload?.message
        state.loading = false
      },
      [showTimeSlot.rejected]: (state, { payload }) => {
        state.error = true
        state.message = payload
        state.loading = false
      },

      [hideTimeSlot.pending]: (state) => {
        state.loading = true
      },
      [hideTimeSlot.fulfilled]: (state, { payload }) => {
        state.message = payload?.message
        state.loading = false
      },
      [hideTimeSlot.rejected]: (state, { payload }) => {
        state.error = true
        state.message = payload
        state.loading = false
      },

   
  },
})

export const { resetSingleData } = slice.actions
export default slice.reducer

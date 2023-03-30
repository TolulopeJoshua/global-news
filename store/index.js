import { createSlice, configureStore } from '@reduxjs/toolkit'

const initialState = {
  loading: true,
  error: false,
  data: null
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setData(state, action) {
      state.data = action.payload;
    },
  }
})

export const dataActions = dataSlice.actions

const store = configureStore({
  reducer: {data: dataSlice.reducer}
})

export default store;
import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    filtered: [],
    loading: false,
    error: null,
    searchQuery: '',
    selectedCategory: 'all',
    sortBy: 'default',
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload
      state.filtered = action.payload
    },
    setLoading: (state, action) => { state.loading = action.payload },
    setError: (state, action) => { state.error = action.payload },
    setSearchQuery: (state, action) => { state.searchQuery = action.payload },
    setCategory: (state, action) => { state.selectedCategory = action.payload },
    setSortBy: (state, action) => { state.sortBy = action.payload },
  },
})

export const { setProducts, setLoading, setError, setSearchQuery, setCategory, setSortBy } = productSlice.actions
export default productSlice.reducer
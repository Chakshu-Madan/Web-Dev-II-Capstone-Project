import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setProducts, setLoading, setError, setSearchQuery, setCategory, setSortBy } from '../store/slices/productSlice'
import ProductCard from '../components/ProductCard'

const Products = () => {
  const dispatch = useDispatch()
  const { items, loading, error, searchQuery, selectedCategory, sortBy } = useSelector((state) => state.products)
  const [debounceTimer, setDebounceTimer] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true))
      try {
        const res = await axios.get('https://fakestoreapi.com/products')
        dispatch(setProducts(res.data))
      } catch (err) {
        dispatch(setError('Failed to fetch products'))
      } finally {
        dispatch(setLoading(false))
      }
    }
    fetchProducts()
  }, [dispatch])

  // Debounced search
  const handleSearch = (e) => {
    const value = e.target.value
    if (debounceTimer) clearTimeout(debounceTimer)
    const timer = setTimeout(() => {
      dispatch(setSearchQuery(value))
    }, 400)
    setDebounceTimer(timer)
  }

  // Filter + Sort
  const getFilteredProducts = () => {
    let result = [...items]

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory)
    }

    if (searchQuery) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price)
    else if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price)
    else if (sortBy === 'rating') result.sort((a, b) => b.rating.rate - a.rating.rate)

    return result
  }

  const categories = ['all', ...new Set(items.map((p) => p.category))]
  const filteredProducts = getFilteredProducts()

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Header */}
      <h1 className="text-3xl font-bold text-white mb-8">All Products</h1>

      {/* Search + Filter + Sort Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">

        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          onChange={handleSearch}
          className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500"
        />

        {/* Category Filter */}
        <select
          onChange={(e) => dispatch(setCategory(e.target.value))}
          className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-pink-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          onChange={(e) => dispatch(setSortBy(e.target.value))}
          className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-pink-500"
        >
          <option value="default">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>

      </div>

      {/* States */}
      {loading && (
        <div className="text-center py-20 text-zinc-400 text-lg">Loading products...</div>
      )}

      {error && (
        <div className="text-center py-20 text-red-400 text-lg">{error}</div>
      )}

      {/* Products Grid */}
      {!loading && !error && (
        <>
          <p className="text-zinc-500 text-sm mb-4">{filteredProducts.length} products found</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20 text-zinc-400">
              No products found for your search.
            </div>
          )}
        </>
      )}

    </div>
  )
}

export default Products
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { setProducts, setLoading } from '../store/slices/productSlice'
import ProductCard from '../components/ProductCard'

const Home = () => {
  const dispatch = useDispatch()
  const { items, loading } = useSelector((state) => state.products)

  useEffect(() => {
    if (items.length === 0) {
      const fetch = async () => {
        dispatch(setLoading(true))
        const res = await axios.get('https://fakestoreapi.com/products')
        dispatch(setProducts(res.data))
        dispatch(setLoading(false))
      }
      fetch()
    }
  }, [])

  const featured = items.slice(0, 4)
  const categories = [...new Set(items.map((p) => p.category))]

  return (
    <div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-pink-950 py-24 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-500 to-transparent" />
        <div className="relative max-w-3xl mx-auto">
          <span className="text-pink-400 text-sm font-semibold uppercase tracking-widest mb-4 block">
            New Season Arrivals
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            Dress to <span className="text-pink-500">Impress</span>
          </h1>
          <p className="text-zinc-400 text-lg mb-8">
            Discover the latest trends in fashion. Premium quality, unbeatable prices.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/products"
              className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-3 rounded-full transition"
            >
              Shop Now
            </Link>
            <Link
              to="/products"
              className="border border-zinc-600 hover:border-pink-500 text-white px-8 py-3 rounded-full transition"
            >
              View All
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-zinc-900 border-y border-zinc-800 py-6">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-3 text-center gap-4">
          <div>
            <p className="text-2xl font-bold text-pink-500">500+</p>
            <p className="text-zinc-400 text-sm">Products</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-pink-500">Free</p>
            <p className="text-zinc-400 text-sm">Shipping</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-pink-500">24/7</p>
            <p className="text-zinc-400 text-sm">Support</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-white mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/products`}
              className="bg-zinc-900 border border-zinc-800 hover:border-pink-500 rounded-2xl p-6 text-center transition group"
            >
              <p className="text-white font-medium capitalize group-hover:text-pink-400 transition">
                {cat}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Featured Products</h2>
          <Link to="/products" className="text-pink-400 hover:underline text-sm">
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12 text-zinc-400">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Banner */}
      <section className="bg-gradient-to-r from-pink-900 to-zinc-900 py-16 px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-3">
          Get 20% Off Your First Order
        </h2>
        <p className="text-zinc-300 mb-6">Sign up today and unlock exclusive deals.</p>
        <Link
          to="/register"
          className="bg-white text-pink-600 font-semibold px-8 py-3 rounded-full hover:bg-zinc-100 transition"
        >
          Join StyleHub
        </Link>
      </section>

    </div>
  )
}

export default Home
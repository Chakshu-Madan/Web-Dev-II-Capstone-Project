import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { setProducts } from '../../store/slices/productSlice'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts'

const COLORS = ['#ec4899', '#f97316', '#8b5cf6', '#06b6d4', '#10b981']

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const { items } = useSelector((state) => state.products)

  // Protect route
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/')
    }
  }, [isAuthenticated])

  // Fetch products if not loaded
  useEffect(() => {
    if (items.length === 0) {
      axios.get('https://fakestoreapi.com/products').then((res) => {
        dispatch(setProducts(res.data))
      })
    }
  }, [])

  // Chart Data
  const categoryCounts = items.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1
    return acc
  }, {})

  const pieData = Object.entries(categoryCounts).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }))

  const barData = Object.entries(categoryCounts).map(([name, value]) => ({
    category: name.charAt(0).toUpperCase() + name.slice(1),
    products: value,
  }))

  const avgPriceByCategory = items.reduce((acc, p) => {
    if (!acc[p.category]) acc[p.category] = { total: 0, count: 0 }
    acc[p.category].total += p.price
    acc[p.category].count += 1
    return acc
  }, {})

  const priceData = Object.entries(avgPriceByCategory).map(([name, val]) => ({
    category: name.charAt(0).toUpperCase() + name.slice(1),
    avgPrice: parseFloat((val.total / val.count).toFixed(2)),
  }))

  const totalProducts = items.length
  const avgPrice = items.length
    ? (items.reduce((s, p) => s + p.price, 0) / items.length).toFixed(2)
    : 0
  const topRated = items.reduce((best, p) => p.rating.rate > (best?.rating?.rate || 0) ? p : best, null)

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-zinc-400 mt-1">Welcome back, Admin. Here's your store overview.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <p className="text-zinc-400 text-sm">Total Products</p>
          <p className="text-3xl font-bold text-white mt-1">{totalProducts}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <p className="text-zinc-400 text-sm">Categories</p>
          <p className="text-3xl font-bold text-white mt-1">{pieData.length}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <p className="text-zinc-400 text-sm">Avg. Price</p>
          <p className="text-3xl font-bold text-pink-400 mt-1">${avgPrice}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <p className="text-zinc-400 text-sm">Top Rated</p>
          <p className="text-lg font-bold text-white mt-1 line-clamp-1">
            {topRated?.title?.split(' ').slice(0, 3).join(' ')}...
          </p>
          <p className="text-yellow-400 text-sm">★ {topRated?.rating?.rate}</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

        {/* Bar Chart */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-4">Products per Category</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="category" tick={{ fill: '#a1a1aa', fontSize: 11 }} />
              <YAxis tick={{ fill: '#a1a1aa', fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: 8 }}
                labelStyle={{ color: '#fff' }}
              />
              <Bar dataKey="products" fill="#ec4899" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-4">Category Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend wrapperStyle={{ color: '#a1a1aa', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Bar Chart 2 - Avg Price */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
        <h2 className="text-white font-semibold mb-4">Average Price by Category</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={priceData}>
            <XAxis dataKey="category" tick={{ fill: '#a1a1aa', fontSize: 11 }} />
            <YAxis tick={{ fill: '#a1a1aa', fontSize: 11 }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: 8 }}
              labelStyle={{ color: '#fff' }}
            />
            <Bar dataKey="avgPrice" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Product Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white font-semibold">All Products</h2>
          <button
            onClick={() => navigate('/admin/products')}
            className="text-sm text-pink-400 hover:underline"
          >
            Manage Products →
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-zinc-400">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-500 text-left">
                <th className="pb-3 pr-4">Product</th>
                <th className="pb-3 pr-4">Category</th>
                <th className="pb-3 pr-4">Price</th>
                <th className="pb-3">Rating</th>
              </tr>
            </thead>
            <tbody>
              {items.slice(0, 8).map((p) => (
                <tr key={p.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition">
                  <td className="py-3 pr-4 text-white line-clamp-1 max-w-xs">{p.title}</td>
                  <td className="py-3 pr-4 capitalize">{p.category}</td>
                  <td className="py-3 pr-4 text-pink-400">${p.price}</td>
                  <td className="py-3 text-yellow-400">★ {p.rating.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default Dashboard
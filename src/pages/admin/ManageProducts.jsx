import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { setProducts } from '../../store/slices/productSlice'

const ManageProducts = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const { items } = useSelector((state) => state.products)

  const [showForm, setShowForm] = useState(false)
  const [editProduct, setEditProduct] = useState(null)
  const [formData, setFormData] = useState({ title: '', price: '', category: '', description: '' })
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') navigate('/')
  }, [isAuthenticated])

  useEffect(() => {
    if (items.length === 0) {
      axios.get('https://fakestoreapi.com/products').then((res) => {
        dispatch(setProducts(res.data))
      })
    }
  }, [])

  const handleEdit = (product) => {
    setEditProduct(product)
    setFormData({
      title: product.title,
      price: product.price,
      category: product.category,
      description: product.description,
    })
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      dispatch(setProducts(items.filter((p) => p.id !== id)))
    }
  }

  const handleSubmit = () => {
    if (!formData.title || !formData.price || !formData.category) {
      alert('Please fill all required fields')
      return
    }

    if (editProduct) {
      // Update
      const updated = items.map((p) =>
        p.id === editProduct.id ? { ...p, ...formData, price: parseFloat(formData.price) } : p
      )
      dispatch(setProducts(updated))
    } else {
      // Add new
      const newProduct = {
        id: Date.now(),
        ...formData,
        price: parseFloat(formData.price),
        image: 'https://fakestoreapi.com/img/81fAn1GQ7IL._AC_UY879_.jpg',
        rating: { rate: 0, count: 0 },
      }
      dispatch(setProducts([...items, newProduct]))
    }

    setShowForm(false)
    setEditProduct(null)
    setFormData({ title: '', price: '', category: '', description: '' })
  }

  const filtered = items.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Manage Products</h1>
          <p className="text-zinc-400 mt-1">{items.length} total products</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="text-zinc-400 hover:text-pink-400 transition text-sm"
          >
            ← Dashboard
          </button>
          <button
            onClick={() => { setShowForm(true); setEditProduct(null); setFormData({ title: '', price: '', category: '', description: '' }) }}
            className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-full text-sm transition"
          >
            + Add Product
          </button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 mb-8">
          <h2 className="text-white font-semibold mb-4">
            {editProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-zinc-400 text-sm mb-1 block">Title *</label>
              <input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-pink-500"
                placeholder="Product title"
              />
            </div>
            <div>
              <label className="text-zinc-400 text-sm mb-1 block">Price *</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-pink-500"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="text-zinc-400 text-sm mb-1 block">Category *</label>
              <input
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-pink-500"
                placeholder="e.g. men's clothing"
              />
            </div>
            <div>
              <label className="text-zinc-400 text-sm mb-1 block">Description</label>
              <input
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-pink-500"
                placeholder="Product description"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleSubmit}
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full text-sm transition"
            >
              {editProduct ? 'Save Changes' : 'Add Product'}
            </button>
            <button
              onClick={() => { setShowForm(false); setEditProduct(null) }}
              className="border border-zinc-700 text-zinc-400 hover:text-white px-6 py-2 rounded-full text-sm transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500 mb-6"
      />

      {/* Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <table className="w-full text-sm text-zinc-400">
          <thead>
            <tr className="border-b border-zinc-800 text-zinc-500 text-left bg-zinc-800/50">
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-white rounded-lg p-1 w-10 h-10 flex items-center justify-center shrink-0">
                      <img src={p.image} alt={p.title} className="h-full object-contain" />
                    </div>
                    <span className="text-white line-clamp-1 max-w-xs">{p.title}</span>
                  </div>
                </td>
                <td className="px-4 py-3 capitalize">{p.category}</td>
                <td className="px-4 py-3 text-pink-400">${p.price}</td>
                <td className="px-4 py-3 text-yellow-400">★ {p.rating.rate}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="text-xs bg-zinc-700 hover:bg-zinc-600 text-white px-3 py-1 rounded-full transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-xs bg-red-900/40 hover:bg-red-700 text-red-400 hover:text-white px-3 py-1 rounded-full transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default ManageProducts
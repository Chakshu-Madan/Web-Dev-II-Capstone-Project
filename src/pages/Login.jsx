import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../store/slices/authSlice'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  // Mock users for testing 
  const mockUsers = [
    { id: 1, name: 'Admin User', email: 'admin@stylehub.com', password: 'admin123', role: 'admin' },
    { id: 2, name: 'John Doe', email: 'john@gmail.com', password: 'john123', role: 'customer' },
  ]

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const found = mockUsers.find(
      (u) => u.email === formData.email && u.password === formData.password
    )
    if (found) {
      dispatch(login(found))
      found.role === 'admin' ? navigate('/admin/dashboard') : navigate('/')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-pink-500">👗 StyleHub</h1>
          <p className="text-zinc-400 mt-2">Welcome back! Please login.</p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-2 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-zinc-400 mb-1 block">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-400 mb-1 block">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2.5 rounded-lg transition mt-2"
          >
            Login
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-zinc-500 text-sm mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-pink-400 hover:underline">
            Register
          </Link>
        </p>

        {/* Test Credentials Hint */}
        <div className="mt-6 bg-zinc-800 rounded-lg p-3 text-xs text-zinc-400">
          <p className="font-semibold text-zinc-300 mb-1">Test Credentials:</p>
          <p>👤 Customer: john@gmail.com / john123</p>
          <p>🔧 Admin: admin@stylehub.com / admin123</p>
        </div>

      </div>
    </div>
  )
}

export default Login
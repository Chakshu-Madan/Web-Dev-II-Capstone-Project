import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/slices/authSlice'

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const cartItems = useSelector((state) => state.cart.items)

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <nav className="bg-zinc-900 shadow-md shadow-zinc-800 sticky top-0 z-50 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-pink-600">
          👗 StyleHub
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-6 text-sm font-medium text-zinc-300">
          <Link to="/" className="hover:text-pink-400 transition">Home</Link>
          <Link to="/products" className="hover:text-pink-400 transition">Products</Link>

          {isAuthenticated && user?.role === 'admin' && (
            <Link to="/admin/dashboard" className="hover:text-pink-400 transition">
              Admin
            </Link>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Cart */}
          <Link to="/cart" className="relative">
            <span className="text-2xl">🛒</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Auth Buttons */}
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-zinc-400">Hi, {user?.role === 'admin' ? 'Admin' : user?.name}</span>
              <button
                onClick={handleLogout}
                className="bg-pink-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-pink-700 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-sm text-pink-600 font-medium hover:underline"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-pink-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-pink-700 transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  )
}

export default Navbar
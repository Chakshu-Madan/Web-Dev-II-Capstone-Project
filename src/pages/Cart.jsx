import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice'
import { Link, useNavigate } from 'react-router-dom'

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { items } = useSelector((state) => state.cart)
  const { isAuthenticated } = useSelector((state) => state.auth)

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (items.length === 0) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <span className="text-6xl">🛒</span>
      <h2 className="text-2xl font-bold text-white">Your cart is empty</h2>
      <p className="text-zinc-400">Looks like you haven't added anything yet.</p>
      <Link
        to="/products"
        className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2.5 rounded-full transition"
      >
        Browse Products
      </Link>
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Cart Items */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex gap-4 items-center"
            >
              {/* Image */}
              <div className="bg-white rounded-xl p-2 w-20 h-20 flex items-center justify-center shrink-0">
                <img src={item.image} alt={item.title} className="h-full object-contain" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium line-clamp-2">{item.title}</p>
                <p className="text-pink-400 text-sm mt-1">${item.price}</p>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-2 bg-zinc-800 rounded-lg px-3 py-1">
                <button
                  onClick={() => {
                    if (item.quantity === 1) dispatch(removeFromCart(item.id))
                    else dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
                  }}
                  className="text-white hover:text-pink-400 transition"
                >−</button>
                <span className="text-white w-5 text-center text-sm">{item.quantity}</span>
                <button
                  onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                  className="text-white hover:text-pink-400 transition"
                >+</button>
              </div>

              {/* Subtotal */}
              <p className="text-white font-bold w-16 text-right">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              {/* Remove */}
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-zinc-500 hover:text-red-400 transition text-xl"
              >✕</button>
            </div>
          ))}

          {/* Clear Cart */}
          <button
            onClick={() => dispatch(clearCart())}
            className="text-zinc-500 hover:text-red-400 text-sm transition self-start"
          >
            Clear entire cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 h-fit">
          <h2 className="text-white font-bold text-lg mb-4">Order Summary</h2>

          <div className="flex flex-col gap-3 text-sm text-zinc-400">
            <div className="flex justify-between">
              <span>Items ({items.reduce((s, i) => s + i.quantity, 0)})</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-400">Free</span>
            </div>
            <div className="border-t border-zinc-700 pt-3 flex justify-between text-white font-bold text-base">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => {
              if (!isAuthenticated) {
                navigate('/login')
              } else {
                alert('Order placed successfully! 🎉')
                dispatch(clearCart())
              }
            }}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-xl transition mt-6"
          >
            {isAuthenticated ? 'Place Order' : 'Login to Checkout'}
          </button>
        </div>

      </div>
    </div>
  )
}

export default Cart
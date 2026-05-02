import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/slices/cartSlice'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-pink-500 transition group">

      {/* Image */}
      <Link to={`/products/${product.id}`}>
        <div className="bg-white p-4 h-52 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="h-full object-contain group-hover:scale-105 transition duration-300"
          />
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2">
        <span className="text-xs text-pink-400 uppercase tracking-wide">
          {product.category}
        </span>

        <Link to={`/products/${product.id}`}>
          <h3 className="text-sm text-white font-medium line-clamp-2 hover:text-pink-400 transition">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-center gap-1 text-xs text-zinc-400">
          <span className="text-yellow-400">★</span>
          {product.rating.rate} ({product.rating.count})
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="text-white font-bold text-lg">${product.price}</span>
          <button
            onClick={() => dispatch(addToCart(product))}
            className="bg-pink-600 hover:bg-pink-700 text-white text-xs px-3 py-1.5 rounded-full transition"
          >
            Add to Cart
          </button>
        </div>
      </div>

    </div>
  )
}

export default ProductCard
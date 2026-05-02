import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { addToCart } from '../store/slices/cartSlice'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`)
        setProduct(res.data)
      } catch (err) {
        navigate('/products')
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product))
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) return (
    <div className="text-center py-20 text-zinc-400 text-lg">Loading product...</div>
  )

  if (!product) return null

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">

      {/* Back Button */}
      <button
        onClick={() => navigate('/products')}
        className="text-zinc-400 hover:text-pink-400 transition mb-8 flex items-center gap-2"
      >
        ← Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Image */}
        <div className="bg-white rounded-2xl p-8 flex items-center justify-center h-96">
          <img
            src={product.image}
            alt={product.title}
            className="h-full object-contain"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4">
          <span className="text-pink-400 text-sm uppercase tracking-wide">
            {product.category}
          </span>

          <h1 className="text-2xl font-bold text-white">{product.title}</h1>

          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <span className="text-yellow-400 text-lg">★</span>
            <span>{product.rating.rate}</span>
            <span>({product.rating.count} reviews)</span>
          </div>

          <p className="text-zinc-400 text-sm leading-relaxed">{product.description}</p>

          <div className="text-3xl font-bold text-white mt-2">${product.price}</div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mt-2">
            <span className="text-zinc-400 text-sm">Quantity:</span>
            <div className="flex items-center gap-3 bg-zinc-800 rounded-lg px-3 py-1">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="text-white text-lg hover:text-pink-400 transition"
              >−</button>
              <span className="text-white w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="text-white text-lg hover:text-pink-400 transition"
              >+</button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className={`mt-4 py-3 rounded-xl font-semibold text-white transition ${
              added
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-pink-600 hover:bg-pink-700'
            }`}
          >
            {added ? '✓ Added to Cart!' : 'Add to Cart'}
          </button>

        </div>
      </div>
    </div>
  )
}

export default ProductDetail
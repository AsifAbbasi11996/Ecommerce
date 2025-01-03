import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllItems } from '../api/itemApi.js' // Import the API function
import '../assets/styles/BestSellingProducts.css'
import { BsHeart } from 'react-icons/bs'
import { FaStar, FaStarHalf } from 'react-icons/fa' // Import FaStarHalf instead of FaStarHalfAlt
import { formatImageUrl } from '../utils/formatImage'
import { formatPrice } from '../utils/formatPrice'
import Loader from './Loader.js'
import { ToastContainer, toast } from 'react-toastify' // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css' // Import toast styles
import { useCart } from '../context/CartContext.js'
import { useWishlist } from '../context/WishlistContext.js'
import { PiShoppingCartSimple } from 'react-icons/pi'
import { truncateText } from '../utils/formatText.js'

const BestSellingProducts = () => {
  const { handleAddToCart } = useCart()
  const { handleAddToWishlist } = useWishlist()
  const [items, setItems] = useState([]) // State to hold fetched products
  const [loading, setLoading] = useState(true) // State to handle loading state
  const [error, setError] = useState(null) // State to handle any errors
  const userId = localStorage.getItem('userId')

  // Fetch products from API when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getAllItems() // Fetch the data
        setItems(fetchedProducts) // Set the products in state
      } catch (err) {
        setError('Error fetching products') // Handle any errors
      } finally {
        setLoading(false) // Set loading to false after fetch completes
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <div>{error}</div> // Show error state
  }

  // Function to render stars based on the rating
  const renderStars = rating => {
    const fullStars = Math.floor(rating) // Full stars (integer part)
    const hasHalfStar = rating % 1 >= 0.5 // Check if there's a half star

    return (
      <>
        {Array.from({ length: fullStars }).map((_, index) => (
          <FaStar key={`full-${index}`} />
        ))}
        {hasHalfStar && <FaStarHalf />} {/* Render half star if necessary */}
      </>
    )
  }

  // Function to handle adding product to the cart
  const handleAddToCartClick = product => {
    if (!userId) {
      toast.error('Please log in to add items to the cart.')
      return
    }

    handleAddToCart(userId, product._id) // Add the product to the global cart state
    toast.success('Added to Cart!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      draggable: false
    })
  }

  // Function to handle adding product to the wishlist
  const handleAddToWishlistClick = product => {
    if (!userId) {
      toast.error('Please log in to add items to the cart.')
      return
    }
    handleAddToWishlist(userId, product._id) // Add the product to the wishlist
    toast.success('Added to Wishlist!', {
      position: 'top-right', // Position at the top-right
      autoClose: 3000, // Duration of 3 seconds
      hideProgressBar: false, // Hide the progress bar
      draggable: false // Non-draggable
    })
  }

  return (
    <div className='best_selling_products_container'>
      <div className='best_selling_products_title'>
        <div className='best_selling_products_header'>
          <p>This Month</p>
          <h2>Best Selling Products</h2>
        </div>

        <Link className='btn'>
          <button>View All</button>
        </Link>
      </div>

      <div className='best_selling_products'>
        {/* Loop through the items and render each one */}
        {items.map(product => (
          <div className='product'>
            <Link
              to={`/v/${product._id}`}
              className='view-details'
              key={product._id}
            >
              <div className='card'>
                <div className='card-product'>
                  <p className='discount'>-{product.discount.percentage}%</p>
                  <div className='card-image'>
                    {/* Use the first image of the first color */}
                    <img
                      src={formatImageUrl(product.images[0])}
                      alt={product.itemName}
                    />
                  </div>
                </div>
                <div className='card-content'>
                  <p className='name'>{truncateText(product.itemName)}</p>{' '}
                  {/* Truncated product name */}
                  <p className='price'>
                    {/* Display the sale price and the MRP */}
                    <span className='sp'>{formatPrice(product.sp)}</span>
                    <span className='mrp'>{formatPrice(product.mrp)}</span>
                  </p>
                  <p className='rating'>
                    {renderStars(product.rating)}{' '}
                    {/* Render full and half stars */}
                  </p>
                </div>
              </div>
            </Link>
            <div className='icons'>
              <div
                className='icon'
                onClick={() => handleAddToWishlistClick(product)} // Pass the event to stop propagation
              >
                <BsHeart />
              </div>
              <div
                className='icon'
                onClick={() => handleAddToCartClick(product)} // Pass the event to stop propagation
              >
                <PiShoppingCartSimple />
              </div>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  )
}

export default BestSellingProducts

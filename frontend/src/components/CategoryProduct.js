import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getAllItems } from '../api/itemApi' // Import the API function
import '../assets/styles/CategoryProduct.css'
import { BsHeart } from 'react-icons/bs'
import { FaStar, FaStarHalf } from 'react-icons/fa' // Import FaStarHalf
import { formatImageUrl } from '../utils/formatImage'
import { formatPrice } from '../utils/formatPrice'
import Loader from './Loader'
import { ToastContainer, toast } from 'react-toastify' // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css' // Import toast styles
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { PiShoppingCartSimple } from 'react-icons/pi'
import { truncateText } from '../utils/formatText'
import { formatItemNameForUrl } from '../utils/formatItemName'

const CategoryProduct = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { categoryName } = useParams() // Grab categoryName from the URL params
  const [products, setProducts] = useState([]) // State to hold fetched products
  const [loading, setLoading] = useState(true) // State to handle loading state
  const [error, setError] = useState(null) // State to handle any errors
  const { handleAddToCart } = useCart()
  const { handleAddToWishlist } = useWishlist()
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getAllItems() // Fetch the data
        const filteredProducts = fetchedProducts.filter(
          product =>
            product.category.toLowerCase() === categoryName.toLowerCase()
        )
        setProducts(filteredProducts) // Set the products in state
      } catch (err) {
        setError('Error fetching products') // Handle any errors
      } finally {
        setLoading(false) // Set loading to false after fetch completes
      }
    }

    fetchProducts()
  }, [categoryName]) // Re-fetch when categoryName changes

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
      toast.error('Please log in to add items to the wishlist.')
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
    <div className='category_product_container'>
      <div className='category_product_header'>
        <div className='nav'>
          <Link to='/'>Home</Link>
          <p>/</p>
          <Link>Category</Link>
          <p>/</p>
          <Link>{categoryName}</Link>
        </div>
      </div>

      <div className='category_product_list'>
        {/* Loop through the items and render each one */}
        {products.map(product => (
          <div className='product_item' key={product._id}>
            <Link
              to={`/v/${product._id}/${formatItemNameForUrl(product.itemName)}`}
              className='view-details'
            >
              <div className='card'>
                <div className='card-product'>
                  <p className='discount'>-{product.discount?.percentage}%</p>
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

export default CategoryProduct

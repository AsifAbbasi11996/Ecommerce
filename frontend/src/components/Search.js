import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { searchItems } from '../api/itemApi' // Assuming this is already correct
import { formatImageUrl } from '../utils/formatImage'
import { formatPrice } from '../utils/formatPrice'
import Loader from './Loader'
import { BsHeart } from 'react-icons/bs'
import { FaStar, FaStarHalf } from 'react-icons/fa' // Import FaStarHalf
import { ToastContainer, toast } from 'react-toastify' // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css' // Import toast styles
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { PiShoppingCartSimple } from 'react-icons/pi'
import { truncateText } from '../utils/formatText'
import { formatItemNameForUrl } from '../utils/formatItemName'
import '../assets/styles/CategoryProduct.css'

const Search = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  const [results, setResults] = useState([]) // To store search results
  const [loading, setLoading] = useState(false) // For loading state
  const [error, setError] = useState(null) // For handling errors
  const query = new URLSearchParams(useLocation().search).get('q') // Get search query from URL

  const { handleAddToCart } = useCart()
  const { handleAddToWishlist } = useWishlist()
  const userId = localStorage.getItem('userId') // Check if user is logged in

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query) {
        setLoading(true)
        setError(null)
        try {
          const searchResults = await searchItems(query)
          setResults(searchResults)
        } catch (error) {
          setError('Failed to fetch search results')
        } finally {
          setLoading(false)
        }
      }
    }

    fetchSearchResults()
  }, [query]) // Re-run when query changes

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

  const handleAddToWishlistClick = product => {
    if (!userId) {
      toast.error('Please log in to add items to the wishlist.')
      return
    }
    handleAddToWishlist(userId, product._id) // Add the product to the wishlist
    toast.success('Added to Wishlist!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      draggable: false
    })
  }

  if (loading) return <Loader />
  if (error) return <p>{error}</p>

  return (
    <div className='search_product_container'>
      <div className='search_product_header'>
        <div className='nav'>
          <Link to='/'>Home</Link>
          <p>/</p>
          <Link>Search</Link>
          <p>/</p>
          <Link>{query}</Link>
        </div>
      </div>

      <div className='search_product_list'>
        {/* Loop through the search results and render each one */}
        {results.length > 0 ? (
          results.map(product => (
            <div className='product' key={product._id}>
              <Link
                to={`/v/${product._id}/${formatItemNameForUrl(
                  product.itemName
                )}`}
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
                    <p className='name'>{truncateText(product.itemName)}</p>
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
          ))
        ) : (
          <div className='no_item_found'>
            <p>No items found</p>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  )
}

export default Search

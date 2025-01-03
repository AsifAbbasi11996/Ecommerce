import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { BsCart, BsHeart } from 'react-icons/bs'
import { FaStar, FaStarHalf } from 'react-icons/fa' // Import FaStarHalf for half-star rendering
import { formatImageUrl } from '../utils/formatImage' // Assuming you have this utility to format image URLs
import { formatPrice } from '../utils/formatPrice' // Assuming you have this utility to format price
import '../assets/styles/BestSellingProducts.css'
import { ToastContainer, toast } from 'react-toastify' // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css' // Import toast styles
import { useWishlist } from '../context/WishlistContext'
import { truncateText } from '../utils/formatText'

const RelatedProducts = ({ products }) => {
  const { handleAddToCart } = useCart() // Access handleAddToCart function from context
  const { handleAddToWishlist } = useWishlist()

  const userId = localStorage.getItem('userId')

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

  // Scroll to top when a product is clicked
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scroll to the top
    })
  }

  // Handle adding product to cart
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
    <div className='related-products_container'>
      <h3>Related Products</h3>
      <div className='related-products'>
        {products.length > 0 ? (
          products.map(product => (
            <div className='product'>
              <Link
                to={`/v/${product._id}`}
                key={product._id}
                className='related-product_item'
                onClick={handleScrollToTop}
              >
                <div className='card'>
                  <div className='card-product'>
                    <p className='discount'>-{product.discount.percentage}%</p>
                    <div className='card-image'>
                      {/* Use the first image of the product */}
                      <img
                        src={formatImageUrl(product.images[0])}
                        alt={product.itemName}
                      />
                    </div>
                  </div>
                  <div className='card-content'>
                    <p>{truncateText(product.itemName)}</p>
                    <p className='price'>
                      {/* Display the sale price */}
                      <span className='sp'>{formatPrice(product.sp)}</span>
                      {/* Display the MRP */}
                      <span className='mrp'>{formatPrice(product.mrp)}</span>
                    </p>
                    <p className='rating'>
                      {/* Render full and half stars */}
                      {renderStars(product.rating)}
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
                  <BsCart />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No related products found.</p>
        )}
      </div>
      <ToastContainer />
    </div>
  )
}

export default RelatedProducts
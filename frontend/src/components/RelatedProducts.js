import React from 'react'
import { Link } from 'react-router-dom'
import { CiHeart } from 'react-icons/ci'
import { BsEye } from 'react-icons/bs'
import { FaStar, FaStarHalf } from 'react-icons/fa' // Import FaStarHalf for half-star rendering
import { formatImageUrl } from '../utils/formatImage' // Assuming you have this utility to format image URLs
import { formatPrice } from '../utils/formatPrice' // Assuming you have this utility to format price
import '../assets/styles/BestSellingProducts.css'

const RelatedProducts = ({ products }) => {
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

  return (
    <div className='related-products_container'>
      <h3>Related Products</h3>
      <div className='related-products'>
        {products.length > 0 ? (
          products.map(product => (
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
                  <div className='icons'>
                    <div className='icon'>
                      <CiHeart /> {/* Add the heart icon for wishlist */}
                    </div>
                    <div className='icon'>
                      <BsEye /> {/* Add the eye icon for view */}
                    </div>
                  </div>
                </div>
                <div className='card-content'>
                  <p>{product.itemName}</p>
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
          ))
        ) : (
          <p>No related products found.</p>
        )}
      </div>
    </div>
  )
}

export default RelatedProducts

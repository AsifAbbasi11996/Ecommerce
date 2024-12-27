import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllItems } from '../api/itemApi.js' // Import the API function
import '../assets/styles/BestSellingProducts.css'
import { CiHeart } from 'react-icons/ci'
import { BsEye } from 'react-icons/bs'
import { FaStar, FaStarHalf } from 'react-icons/fa' // Import FaStarHalf instead of FaStarHalfAlt
import { formatImageUrl } from '../utils/formatImage'
import { formatPrice } from '../utils/formatPrice'

const BestSellingProducts = () => {
  const [products, setProducts] = useState([]) // State to hold fetched products
  const [loading, setLoading] = useState(true) // State to handle loading state
  const [error, setError] = useState(null) // State to handle any errors

  // Fetch products from API when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getAllItems() // Fetch the data
        setProducts(fetchedProducts) // Set the products in state
      } catch (err) {
        setError('Error fetching products') // Handle any errors
      } finally {
        setLoading(false) // Set loading to false after fetch completes
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return <div>Loading...</div> // Show loading state
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
        {/* Loop through the products and render each one */}
        {products.map(product => (
          <Link to={`/v/${product._id}`} className='view-details'>
            <div className='card' key={product._id}>
              <div className='card-product'>
                <div className='card-image'>
                  {/* Use the first image of the first color */}
                  <img
                    src={formatImageUrl(product.images[0])}
                    alt={product.itemName}
                  />
                </div>
                <div className='icons'>
                  <div className='icon'>
                    <CiHeart />
                  </div>
                  <div className='icon'>
                    <BsEye />
                  </div>
                </div>
              </div>
              <div className='card-content'>
                <p>{product.itemName}</p>
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
        ))}
      </div>
    </div>
  )
}

export default BestSellingProducts

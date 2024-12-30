import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import '../assets/styles/ViewProduct.css' // Add your own styles
import { getItemById, getRelatedProductsByCategory } from '../api/itemApi.js'
import { FaStar, FaStarHalf } from 'react-icons/fa'
import { CiHeart } from 'react-icons/ci'
import { BsCart } from 'react-icons/bs'
import { formatImageUrl } from '../utils/formatImage'
import { formatPrice } from '../utils/formatPrice.js'
import RelatedProducts from './RelatedProducts'
import Loader from './Loader.js'

const ViewProduct = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { id } = useParams() // Get product ID from URL
  const [product, setProduct] = useState(null) // State to store product data
  const [loading, setLoading] = useState(true) // Loading state
  const [error, setError] = useState(null) // Error state
  const [quantity, setQuantity] = useState(1) // State to store selected quantity
  const [relatedProducts, setRelatedProducts] = useState([]) // State to store related products
  const [selectedImage, setSelectedImage] = useState(null) // State to store selected image for large view
  const [selectedColor, setSelectedColor] = useState(null)

  const navigate = useNavigate()

  // Fetch product details when the component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getItemById(id)
        setProduct(fetchedProduct)
        setSelectedImage(fetchedProduct.images[0]) // Set the first image as the default large image
        if (fetchedProduct.category) {
          fetchRelatedProducts(fetchedProduct.category) // Fetch related products by category
        }
      } catch (err) {
        setError('Error fetching product details')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  // Fetch related products by category
  const fetchRelatedProducts = async category => {
    try {
      const data = await getRelatedProductsByCategory(category) // Fetch related products by category
      setRelatedProducts(data) // Set related products in state
    } catch (err) {
      console.error('Error fetching related products', err)
    }
  }

  // Function to render stars based on the rating
  const renderStars = rating => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    return (
      <>
        {Array.from({ length: fullStars }).map((_, index) => (
          <FaStar key={`full-${index}`} />
        ))}
        {hasHalfStar && <FaStarHalf />}
      </>
    )
  }

  // Function to handle quantity increase
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  // Function to handle quantity decrease
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  // Loading and error handling
  if (loading) {
    return <Loader />
  }

  if (error) {
    return <div>{error}</div>
  }

  const handleAddToCart = () => {
    if (product.color && product.color.length > 0 && !selectedColor) {
      alert('Please select a color before adding to the cart') // Alert if no color is selected
      return // Prevent adding to cart if no color is selected
    }
    console.log(
      'Added to cart',
      product,
      'Quantity:',
      quantity,
      'Color:',
      selectedColor
    )
  }

  const handleAddToWishlist = () => {
    console.log('Added to wishlist', product, 'Color:', selectedColor)
  }

  const handleBuyNow = () => {
    if (product.color && product.color.length > 0 && !selectedColor) {
      alert('Please select a color before proceeding to buy') // Alert if no color is selected
      return // Prevent proceeding if no color is selected
    }

    console.log(
      'Proceeding to buy',
      product,
      'Quantity:',
      quantity,
      'Color:',
      selectedColor
    )
    navigate('/checkout', {
      state: { product, quantity, selectedImage, selectedColor }
    }) // Pass selectedColor to checkout
  }

  // Function to handle image click from sm_img
  const handleImageClick = image => {
    setSelectedImage(image) // Set the clicked image as the large image
  }

  // Handle color selection
  const handleColorSelect = color => {
    setSelectedColor(color)
  }

  return (
    <div className='view-product_container'>
      <div className='nav'>
        <Link to='/'>Home</Link>
        <p>/</p>
        <Link>Product</Link>
        <p>/</p>
        <Link>View Product</Link>
      </div>

      <div className='view-product'>
        <div className='product-details'>
          <div className='product-image'>
            <div className='sm_img'>
              {product.images.map((image, index) => (
                <img
                  key={index} // Adding a unique key for each image
                  src={formatImageUrl(image)} // Use the formatImageUrl to ensure the correct path
                  alt={`${product.itemName} - Image ${index + 1}`} // Add an appropriate alt text for each image
                  onClick={() => handleImageClick(image)} // Click handler to update the large image
                />
              ))}
            </div>
            <div className='lg_img'>
              <img
                src={formatImageUrl(selectedImage)} // Display the selected image
                alt={product.itemName}
              />
            </div>
          </div>
          <div className='product-info'>
            <h2 className='name'>{product.itemName}</h2>
            <p className='rating'>
              <span>{renderStars(product.rating)}</span>
              <span className='div'>|</span>
              <span className='status'>{product.status}</span>
            </p>
            <p className='brand'>{product.brand}</p>
            <p className='price'>
              <span className='sp'>{formatPrice(product.sp)}</span>
              <span className='mrp'>{formatPrice(product.mrp)}</span>
              <span className='discount'>({product.discount.percentage}% off)</span>
            </p>
            <p className='colors'>
              Colors
              {product.color.map((col, index) => (
                <button
                  key={index}
                  onClick={() => handleColorSelect(col)} // Update the color selection
                  style={{
                    backgroundColor:
                      selectedColor === col ? '#db4444' : 'white',
                    color: selectedColor === col ? 'white' : 'black'
                  }}
                >
                  {col}
                  {index < product.color.length - 1 && ', '}
                </button>
              ))}
            </p>
            <div className='qty_cart'>
              <div className='quantity-selector'>
                <button onClick={decreaseQuantity} disabled={quantity <= 1}>
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
              <button onClick={handleAddToCart} className='btn-cart'>
                <BsCart /> Add to Cart
              </button>
            </div>
            <div className='buttons'>
              <button onClick={handleAddToWishlist} className='btn-wishlist'>
                <CiHeart /> Add to Wishlist
              </button>
              <button onClick={handleBuyNow} className='btn-buy'>
                Buy Now
              </button>
            </div>
            <hr />
            <div className='item-details'>
              {product.itemdetail &&
                product.itemdetail.map((detail, index) => (
                  <p key={index}>{detail}</p>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products section */}
      <RelatedProducts products={relatedProducts} />
    </div>
  )
}

export default ViewProduct

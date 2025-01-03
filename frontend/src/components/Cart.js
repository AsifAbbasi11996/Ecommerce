import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BsTrash } from 'react-icons/bs'
import { useCart } from '../context/CartContext' // Import useCart hook
import { viewCart } from '../api/cartApi' // Import the viewCart API function
import '../assets/styles/Cart.css'
import { formatPrice } from '../utils/formatPrice'
import Loader from './Loader'
import { formatImageUrl } from '../utils/formatImage'
import { FiShoppingCart } from 'react-icons/fi'

const Cart = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { handleRemoveFromCart, handleClearCart } = useCart()

  const [fullCartItems, setFullCartItems] = useState([]) // To store the detailed cart items (with item data)
  const [loading, setLoading] = useState(true) // For loading state
  const [error, setError] = useState(null) // For handling errors
  const navigate = useNavigate()
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const cartData = await viewCart(userId) // Call the viewCart API
        // Ensure each item has a quantity property, defaulting to 1
        const updatedItems = cartData.cart.items.map(item => ({
          ...item,
          quantity: item.quantity || 1 // Set quantity to 1 if it's not set
        }))
        setFullCartItems(updatedItems) // Store the updated items with quantity
        setLoading(false)
      } catch (err) {
        setError(err.message) // Set the error message
        setLoading(false)
      }
    }

    if (userId) {
      fetchCartData() // Fetch the cart data if userId is available
    }
  }, [userId])

  // Function to handle quantity increase for a specific item
  const increaseQuantity = item => {
    if (item.quantity < item.item.stock) {
      setFullCartItems(prevItems =>
        prevItems.map(cartItem =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      )
    }
  }

  // Function to handle quantity decrease for a specific item
  const decreaseQuantity = item => {
    if (item.quantity > 1) {
      setFullCartItems(prevItems =>
        prevItems.map(cartItem =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      )
    }
  }

  const calculateTotalPrice = () => {
    return fullCartItems
      .reduce((total, item) => total + item.item.sp * item.quantity, 0)
      .toFixed(2) // Assume 'sp' is the selling price
  }

  const handleProceedToCheckout = () => {
    // Create an array of cart items to pass
    const cartItems = fullCartItems.map(item => ({
      item: item.item, // item data
      quantity: item.quantity, // item quantity
      selectedImage: item.item.images[0], // selected image (can be the first one in images array)
      selectedColor: item.item.color[0] // selected color
    }))

    // Navigate to Checkout page, passing the cart items as state
    navigate('/checkout', { state: { cartItems } })
  }

  const handleRemove = async itemId => {
    try {
      const updatedCart = await handleRemoveFromCart(userId, itemId)
      if (updatedCart && updatedCart.cart && updatedCart.cart.items) {
        // Update the state only with the remaining items (excluding the removed one)
        setFullCartItems(updatedCart.cart.items)
      } else {
        console.error('Updated cart structure is incorrect', updatedCart)
      }
    } catch (error) {
      console.error('Error removing item from cart:', error)
    }
  }

  // Function to clear the entire cart
  const handleClear = async () => {
    try {
      await handleClearCart(userId) // Use the handleClearCart from context
      setFullCartItems([]) // Clear the cart items in the UI
    } catch (error) {
      console.error('Error clearing the cart:', error)
    }
  }

  if (loading) return <Loader />
  if (error) return <p>{error}</p>

  const handleNavigate = () => {
    navigate('/')
  }

  return (
    <div className='cart_container'>
      <div className='cart_header'>
        <div className='nav'>
          <Link to='/'>Home</Link>
          <p>/</p>
          <Link>Cart</Link>
        </div>
      </div>

      <div className='cart_content'>
        {fullCartItems.length > 0 ? (
          <>
            <div className='cart_items'>
              {fullCartItems.map(item => (
                <div key={item._id} className='cart_item'>
                  <Link
                    to={`/v/${item.item._id}`}
                    className='view-details'
                    key={item._id}
                  >
                    <div className='cart_item_image'>
                      {item.item &&
                      item.item.images &&
                      item.item.images.length > 0 ? (
                        <img
                          src={formatImageUrl(item.item.images[0])} // Assuming images are stored locally
                          alt={item.item.itemName}
                        />
                      ) : (
                        <img
                          src='default_image_url' // Provide a default image if images array is empty or undefined
                          alt='default image'
                        />
                      )}
                    </div>
                  </Link>

                  <div className='cart_item_details'>
                    <Link
                      to={`/v/${item.item._id}`}
                      className='view-details'
                      key={item._id}
                    >
                      <p className='item_name'>{item.item.itemName}</p>
                    </Link>
                    <p className='item_price'>
                      {formatPrice(item.item.sp)}
                      <span className='discount'>
                        (
                        {item.item.discount
                          ? `${item.item.discount.percentage}% off`
                          : 'No discount'}
                        )
                      </span>
                    </p>
                    <p className='color'>
                      <span className='color_name'>{item.item.color[0]}</span>
                    </p>
                    <div className='quantity-selector'>
                      <button
                        onClick={() => decreaseQuantity(item)} // Decrease quantity for specific item
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item)} // Increase quantity for specific item
                        disabled={item.quantity >= item.item.stock}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className='cart_item_remove'>
                    <BsTrash onClick={() => handleRemove(item._id)} />
                  </div>
                </div>
              ))}
              <button className='clear_cart' onClick={handleClear}>
                Clear Cart
              </button>
            </div>

            <div className='cart_summary'>
              <p>
                Total Items:{' '}
                {fullCartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </p>
              <p>Total Price: {formatPrice(calculateTotalPrice())}</p>
              <button
                className='checkout_btn'
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        ) : (
          <>
            <div className='empty_cart'>
              <p>
                <FiShoppingCart /> Your cart is empty.
              </p>
              <button className='continue_shopping' onClick={handleNavigate}>
                Continue Your Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart

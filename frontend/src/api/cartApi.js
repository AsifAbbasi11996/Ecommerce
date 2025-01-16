import axios from 'axios'

const API_URL = 'https://ecommerce-backend-production-f6c3.up.railway.app/cart'

// Add item to cart (without quantity)
export const addToCart = async (userId, itemId) => {
  try {
    const response = await axios.post(`${API_URL}/add`, {
      userId,
      itemId
    })
    return response.data // returns the updated cart
  } catch (error) {
    console.error(
      'Error adding to cart:',
      error.response ? error.response.data : error.message
    )
    throw error
  }
}

// Remove item from cart
export const removeFromCart = async (userId, itemId) => {
  try {
    const response = await axios.delete(`${API_URL}/remove`, {
      data: { userId, itemId } // Correctly passing data as the body
    })
    return response.data // returns the updated cart
  } catch (error) {
    console.error(
      'Error removing item from cart:',
      error.response ? error.response.data : error.message
    )
    throw error
  }
}

// View cart for a specific user
export const viewCart = async userId => {
  try {
    const response = await axios.get(`${API_URL}/view-cart/${userId}`)
    return response.data // returns the cart details
  } catch (error) {
    console.error(
      'Error viewing cart:',
      error.response ? error.response.data : error.message
    )
    throw error
  }
}

// Clear entire cart for a user
export const clearCart = async userId => {
  try {
    const response = await axios.delete(`${API_URL}/clear-cart`, {
      data: { userId }
    })
    return response.data // returns the cleared cart
  } catch (error) {
    console.error(
      'Error clearing cart:',
      error.response ? error.response.data : error.message
    )
    throw error
  }
}

// Checkout for a user (e.g., clearing the cart after purchase)
export const checkout = async userId => {
  try {
    const response = await axios.post(`${API_URL}/checkout`, {
      userId
    })
    return response.data // returns the confirmation after checkout
  } catch (error) {
    console.error(
      'Error during checkout:',
      error.response ? error.response.data : error.message
    )
    throw error
  }
}

// Get cart summary (total items and price)
export const getCartSummary = async userId => {
  try {
    const response = await axios.get(`${API_URL}/cart-summary/${userId}`)
    return response.data // returns the total items and price
  } catch (error) {
    console.error(
      'Error getting cart summary:',
      error.response ? error.response.data : error.message
    )
    throw error
  }
}

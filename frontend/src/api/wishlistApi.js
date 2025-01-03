import axios from 'axios'

const API_URL = 'http://localhost:5000/wishlist'

// Add item to Wishlist (without quantity)
export const addToWishlist = async (userId, itemId) => {
  try {
    const response = await axios.post(`${API_URL}/add`, {
      userId,
      itemId
    })
    return response.data // returns the updated Wishlist
  } catch (error) {
    console.error(
      'Error adding to Wishlist:',
      error.response ? error.response.data : error.message
    )
    throw error
  }
}

// Remove item from Wishlist
export const removeFromWishlist = async (userId, itemId) => {
  try {
    const response = await axios.delete(`${API_URL}/remove`, {
      data: { userId, itemId } // Correctly passing data as the body
    })
    return response.data // returns the updated Wishlist
  } catch (error) {
    console.error(
      'Error removing item from Wishlist:',
      error.response ? error.response.data : error.message
    )
    throw error
  }
}

// View Wishlist for a specific user
export const viewWishlist = async userId => {
  try {
    const response = await axios.get(`${API_URL}/view-wishlist/${userId}`)
    return response.data // returns the Wishlist details
  } catch (error) {
    console.error(
      'Error viewing Wishlist:',
      error.response ? error.response.data : error.message
    )
    throw error
  }
}

// Clear entire Wishlist for a user
export const clearWishlist = async userId => {
  try {
    const response = await axios.delete(`${API_URL}/clear-wishlist`, {
      data: { userId }
    })
    return response.data // returns the cleared Wishlist
  } catch (error) {
    console.error(
      'Error clearing Wishlist:',
      error.response ? error.response.data : error.message
    )
    throw error
  }
}

// Checkout for a user (e.g., clearing the Wishlist after purchase)
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

// Get Wishlist summary (total items and price)
export const getWishlistSummary = async userId => {
  try {
    const response = await axios.get(`${API_URL}/wishlist-summary/${userId}`)
    return response.data // returns the total items and price
  } catch (error) {
    console.error(
      'Error getting Wishlist summary:',
      error.response ? error.response.data : error.message
    )
    throw error
  }
}

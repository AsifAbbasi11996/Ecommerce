import axios from 'axios'

const API_URL = 'https://ecommerce-backend-production-f6c3.up.railway.app/order'

// create order
export const createOrder = async orderPayload => {
  try {
    const response = await axios.post(`${API_URL}/create`, orderPayload)
    return response
  } catch (error) {
    console.error('Error creating order')
    return {
      success: false,
      message: error.response?.data?.message || 'Unknown error'
    }
  }
}

// Get all orders
export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`)
    return response.data
  } catch (error) {
    console.error('Error getting all orders', error)
    return {
      success: false,
      message: error.response?.data?.message || 'Unknown error'
    }
  }
}

// Get orders by user ID
export const getOrdersByUserId = async userId => {
  try {
    const response = await axios.get(`${API_URL}/get/user/${userId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching orders by userId', error)
    return {
      success: false,
      message: error.response?.data?.message || 'Unknown error'
    }
  }
}

// Get order by order ID
export const getOrderByOrderId = async orderId => {
  try {
    const response = await axios.get(`${API_URL}/get/${orderId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching order by order ID', error)
    return {
      success: false,
      message: error.response?.data?.message || 'Unknown error'
    }
  }
}

// Delete order
export const deleteOrder = async orderId => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${orderId}`)
    return response.data
  } catch (error) {
    console.error('Error deleting order', error)
    return {
      success: false,
      message: error.response?.data?.message || 'Unknown error'
    }
  }
}

// Cancel Order
export const cancelOrder = async orderId => {
  try {
    const response = await axios.patch(`${API_URL}/cancel/${orderId}`)
    return response.data
  } catch (error) {
    console.error('Error canceling order:', error)
    return {
      success: false,
      message: error.response?.data?.message || 'Unknown error'
    }
  }
}

// Get Canceled Orders by User ID
export const getCanceledOrders = async userId => {
  try {
    const response = await axios.get(`${API_URL}/cancelOrders/${userId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching canceled orders:', error)
    return {
      success: false,
      message: error.response?.data?.message || 'Unknown error'
    }
  }
}

// Return Order
export const returnOrder = async orderId => {
  try {
    const response = await axios.patch(`${API_URL}/return/${orderId}`)
    return response.data
  } catch (error) {
    console.error('Error returning order:', error)
    return {
      success: false,
      message: error.response?.data?.message || 'Unknown error'
    }
  }
}

// Get Returned Orders by User ID
export const getReturnedOrders = async userId => {
  try {
    const response = await axios.get(`${API_URL}/returnOrders/${userId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching returned orders:', error)
    return {
      success: false,
      message: error.response?.data?.message || 'Unknown error'
    }
  }
}
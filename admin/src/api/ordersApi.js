import axios from 'axios'

const API_URL = 'https://ecommerce-backend-production-f6c3.up.railway.app/order'

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

// Get all orders with user data
export const getAllOrdersWithUserData = async () => {
  try {
    const response = await axios.get(`${API_URL}/alldata`)
    return response.data // Data will already have user info attached from the backend
  } catch (error) {
    console.error('Error getting all orders with user data', error)
    return {
      success: false,
      message: error.response?.data?.message || 'Unknown error'
    }
  }
}

// get Total Orders count
export const getTotalOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/totalOrders`)
    return response.data
  } catch (error) {
    console.error('Error fetching total Orders ', error)
  }
}

// get Total Sales count
export const getTotalSales = async () => {
  try {
    const response = await axios.get(`${API_URL}/totalSales`)
    return response.data
  } catch (error) {
    console.error('Error fetching total Sales ', error)
  }
}

// Get all order placed orders
export const getAllOrderPlacedOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/orderplaced-orders`)
    return response.data
  } catch (error) {
    console.error('Error getting order placed orders', error)
    return {
      success: false,
      message: error.response?.data?.message || 'Unknown error'
    }
  }
}

// Get all shipped orders
export const getAllShippedOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/shipped-orders`)
    return response.data
  } catch (error) {
    console.error('Error getting shipped orders', error)
    return {
      success: false,
      message: error.response?.data?.message || 'Unknown error'
    }
  }
}

// Get all out for delivery orders
export const getAllOutForDeliveryOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/outfordelivery-orders`)
    return response.data
  } catch (error) {
    console.error('Error getting out for delivery orders', error)
    return {
      success: false,
      message: error.response?.data?.message || 'Unknown error'
    }
  }
}

// Get all delivered orders
export const getAllDeliveredOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/delivered-orders`)
    return response.data
  } catch (error) {
    console.error('Error getting delivered orders', error)
    return {
      success: false,
      message: error.response?.data?.message || 'Unknown error'
    }
  }
}

// Get all canceled orders
export const getAllCanceledOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/canceled-orders`)
    return response.data
  } catch (error) {
    console.error('Error getting canceled orders', error)
    return {
      success: false,
      message: error.response?.data?.message || 'Unknown error'
    }
  }
}

// Get all returned orders
export const getAllReturnedOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/returned-orders`)
    return response.data
  } catch (error) {
    console.error('Error getting canceled orders', error)
    return {
      success: false,
      message: error.response?.data?.message || 'Unknown error'
    }
  }
}

// Update Order Status by orderId
export const updateOrderStatus = async (
  orderId,
  newStatus,
  cancellationReason,
  returnReason
) => {
  try {
    const response = await axios.patch(`${API_URL}/updateStatus/${orderId}`, {
      newStatus,
      cancellationReason,
      returnReason
    })
    return response.data
  } catch (error) {
    console.error('Error updating order status', error)
    return {
      success: false,
      message: error.response?.data?.message || 'Unknown error'
    }
  }
}

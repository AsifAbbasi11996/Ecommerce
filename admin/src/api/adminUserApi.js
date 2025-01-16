import axios from 'axios'

const API_URL = 'https://ecommerce-backend-production-f6c3.up.railway.app/admin'

export const loginUser = async userData => {
  try {
    // Create form data to send in the request body
    const formData = new FormData()
    formData.append('usernameOrEmail', userData.usernameOrEmail)
    formData.append('password', userData.password)

    // Send login data to the server
    const response = await axios.post(`${API_URL}/login`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Ensure it's sent as form-data
      }
    })

    // Return the response data (including the token and user data)
    return response.data
  } catch (error) {
    console.error('Error logging in user:', error)
    throw error // Rethrow error to be handled by the caller
  }
}

export const createUser = async userData => {
  try {
    const formData = new FormData()

    // Append user details to FormData
    formData.append('name', userData.name)
    formData.append('username', userData.username)
    formData.append('email', userData.email)
    formData.append('password', userData.password)

    // If there's an image, append it to the form data
    if (userData.image) {
      formData.append('image', userData.image)
    }

    // Send the form data to the server
    const response = await axios.post(`${API_URL}/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Ensure the request is sent as form-data
      }
    })

    // Return the response data
    return response.data
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`) // The correct endpoint for getting all users
    return response.data
  } catch (error) {
    console.error('Error fetching all users:', error)
    throw error
  }
}

export const getUserById = async id => {
  try {
    const response = await axios.get(`${API_URL}/get/${id}`) // The endpoint for fetching a user by ID
    return response.data
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error)
    throw error
  }
}

export const updateUserById = async (id, userData) => {
  try {
    const formData = new FormData()
    formData.append('name', userData.name)
    formData.append('username', userData.username)
    formData.append('email', userData.email)
    formData.append('password', userData.password)

    // If there's an image, append it to the form data
    if (userData.image) {
      formData.append('image', userData.image)
    }

    const response = await axios.put(`${API_URL}/update/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Send form data with image if provided
      }
    })
    return response.data
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error)
    throw error
  }
}

export const deleteUserById = async id => {
  try {
    const response = await axios.delete(`${API_URL}/del/${id}`) // The endpoint for deleting a user by ID
    return response.data
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error)
    throw error
  }
}

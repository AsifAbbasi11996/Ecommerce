import axios from 'axios'

const API_URL = 'https://ecommerce-backend-production-f6c3.up.railway.app/user'

// Get all users
export const getAllUsers = async () => {
  const response = await axios.get(`${API_URL}/all`)
  return response.data
}

// Create User
export const createUser = async user => {
  const response = await axios.post(`${API_URL}/create`, user)
  return response.data
}

// User Login
export const loginUser = async credentials => {
  const response = await axios.post(`${API_URL}/login`, credentials)
  return response.data
}

// Get user by ID
export const getUserById = async userId => {
  const response = await axios.get(`${API_URL}/get/${userId}`)
  return response.data
}

// Update User by ID
export const updateUserById = async (userId, updatedData) => {
  const response = await axios.put(`${API_URL}/update/${userId}`, updatedData)
  return response.data
}

// Delete User by ID
export const deleteUser = async userId => {
  const response = await axios.delete(`${API_URL}/delete/${userId}`)
  return response.data
}

// Update User Password
export const updatePassword = async (userId, passwordData) => {
  const response = await axios.put(
    `${API_URL}/update/password/${userId}`,
    passwordData
  )
  return response.data
}

// Total users
export const totalUsers = async () => {
  const response = await axios.get(`${API_URL}/totalUsers`)
  return response.data
}

// Fetch users created today
export const getUsersToday = async () => {
  const response = await axios.get(`${API_URL}/usersToday`)
  return response.data
}

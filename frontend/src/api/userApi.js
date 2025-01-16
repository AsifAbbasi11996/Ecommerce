import axios from 'axios'
import { API_URL } from '../utils/baseUrl'


// Get all users
export const getAllUsers = async () => {
  const response = await axios.get(`${API_URL}/user/all`)
  return response.data
}

// Create User
export const createUser = async user => {
  const response = await axios.post(`${API_URL}/user/create`, user)
  return response.data
}

// User Login
export const loginUser = async credentials => {
  const response = await axios.post(`${API_URL}/user/login`, credentials)
  return response.data
}

// Get user by ID
export const getUserById = async userId => {
  const response = await axios.get(`${API_URL}/user/get/${userId}`)
  return response.data
}

// Update User by ID
export const updateUserById = async (userId, updatedData) => {
  const response = await axios.put(`${API_URL}/user/update/${userId}`, updatedData)
  return response.data
}

// Delete User by ID
export const deleteUser = async userId => {
  const response = await axios.delete(`${API_URL}/user/delete/${userId}`)
  return response.data
}

// Update User Password
export const updatePassword = async (userId, passwordData) => {
  const response = await axios.put(
    `${API_URL}/user/update/password/${userId}`,
    passwordData
  )
  return response.data
}

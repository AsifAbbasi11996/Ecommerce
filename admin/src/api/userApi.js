import axios from 'axios'

const API_URL = 'https://ecommerce-backend-production-f6c3.up.railway.app/user'

export const getAllUsers = async () => {
  try {
    const users = await axios.get(`${API_URL}/all`)
    return users.data
  } catch (error) {
    console.error('Error Fetching users', error.message)
  }
}

export const createUser = async user => {
  const response = await axios.post(`${API_URL}/create`, user)
  return response.data
}

export const totalUsers = async () => {
  try {
    const users = await axios.get(`${API_URL}/totalUsers`)
    return users.data
  } catch (error) {
    console.error('Error fetching total users', error.message)
  }
}

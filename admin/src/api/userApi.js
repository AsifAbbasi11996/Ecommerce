import axios from 'axios'
import { API_URL } from '../utils/baseUrl'


export const getAllUsers = async () => {
  try {
    const users = await axios.get(`${API_URL}/user/all`)
    return users.data
  } catch (error) {
    console.error('Error Fetching users', error.message)
  }
}

export const createUser = async user => {
  const response = await axios.post(`${API_URL}/user/create`, user)
  return response.data
}

export const totalUsers = async () => {
  try {
    const users = await axios.get(`${API_URL}/user/totalUsers`)
    return users.data
  } catch (error) {
    console.error('Error fetching total users', error.message)
  }
}

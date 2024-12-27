import axios from 'axios'

const API_URL = 'http://localhost:5000/user'

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

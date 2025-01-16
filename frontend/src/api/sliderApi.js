import axios from 'axios'
import { API_URL } from '../utils/baseUrl'


// Set up axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Fetch all sliders
export const getAllSliders = async () => {
  try {
    const response = await axiosInstance.get('/slider/all')
    return response.data // Return the list of sliders
  } catch (error) {
    console.error('Error fetching all sliders:', error.message)
    throw error
  }
}

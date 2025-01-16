import axios from 'axios'
import { API_URL } from '../utils/baseUrl'

// Function to get a category by ID
export const getCategoryById = async id => {
  try {
    const response = await axios.get(`${API_URL}/category/get/${id}`) // Backend endpoint to fetch category by ID
    return response.data // Return the category data
  } catch (error) {
    console.error('Error fetching category by ID:', error)
    throw error // Handle error, might want to show this in the UI
  }
}

// Function to get a category by ID
export const getAllCategories = async id => {
  try {
    const response = await axios.get(`${API_URL}/category/all`) // Backend endpoint to fetch category by ID
    return response.data // Return the category data
  } catch (error) {
    console.error('Error fetching categories :', error)
    throw error // Handle error, might want to show this in the UI
  }
}

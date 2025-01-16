import axios from 'axios'
import { API_URL } from '../utils/baseUrl'

// Function to add a new category
export const addCategory = async (categoryName, link, image) => {
  const formData = new FormData()
  formData.append('categoryName', categoryName)
  formData.append('link', link)

  if (image) {
    formData.append('image', image) // Append image if provided
  }

  try {
    const response = await axios.post(`${API_URL}/category/add`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Set content-type as multipart for file uploads
      }
    })
    return response.data // Return the response from the backend
  } catch (error) {
    console.error('Error adding category:', error)
    throw error
  }
}

// Function to update an existing category by ID
export const updateCategoryById = async (id, categoryName, image) => {
  const formData = new FormData()
  formData.append('categoryName', categoryName)

  if (image) {
    formData.append('image', image) // Append image if provided
  }

  try {
    const response = await axios.put(
      `${API_URL}/category/update/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data' // Set content-type as multipart for file uploads
        }
      }
    )

    return response.data // Return the response from the backend
  } catch (error) {
    console.error('Error updating category:', error)
    throw error
  }
}

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
export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/category/all`) // Backend endpoint to fetch category by ID
    return response.data // Return the category data
  } catch (error) {
    console.error('Error fetching categories :', error)
    throw error // Handle error, might want to show this in the UI
  }
}

export const deleteCategoryById = async id => {
  try {
    const response = await axios.delete(`${API_URL}/category/del/${id}`)
    return response.data // Return the delete confirmation message
  } catch (error) {
    console.error('Error deleting category', error)
    throw error
  }
}

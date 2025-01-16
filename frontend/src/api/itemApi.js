import axios from 'axios'
import { API_URL } from '../utils/baseUrl'

// Function to fetch all items
export const getAllItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/item/all`)
    return response.data
  } catch (error) {
    console.error('Error fetching the items:', error.message)
    throw error // Rethrow the error to handle it in the component
  }
}

// Search items based on query
export const searchItems = async query => {
  try {
    const response = await axios.get(`${API_URL}/item/search?query=${query}`)
    // Axios automatically parses the JSON response
    return response.data
  } catch (error) {
    console.error('Error fetching search results:', error)
    throw new Error(error.response?.data?.message || 'Something went wrong')
  }
}

// Function to add a new item
export const addItem = async formData => {
  try {
    const response = await axios.post(`${API_URL}/item/add`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  } catch (error) {
    console.error('Error adding the item:', error.message)
    throw error // Rethrow the error to handle it in the component
  }
}

// Function to get a single item by ID
export const getItemById = async id => {
  try {
    const response = await axios.get(`${API_URL}/item/get/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching item with ID ${id}:`, error.message)
    throw error
  }
}

// Function to update an item by ID
export const updateItemById = async (id, updates) => {
  try {
    const response = await axios.put(`${API_URL}/item/update/${id}`, updates)
    return response.data
  } catch (error) {
    console.error(`Error updating item with ID ${id}:`, error.message)
    throw error
  }
}

// Function to delete an item by ID
export const deleteItemById = async id => {
  try {
    const response = await axios.delete(`${API_URL}/item/del/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error deleting item with ID ${id}:`, error.message)
    throw error
  }
}

// Function to delete an image from an item
export const deleteImageFromItem = async (id, imagePath) => {
  try {
    const response = await axios.delete(`${API_URL}/item/del/${id}/images`, {
      data: { imagePath }
    })
    return response.data
  } catch (error) {
    console.error('Error deleting image from item:', error.message)
    throw error
  }
}

// Function to add images to an item
export const addImagesToItem = async (id, formData) => {
  try {
    const response = await axios.post(
      `${API_URL}/item/add/${id}/images`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    )
    return response.data
  } catch (error) {
    console.error('Error adding images to item:', error.message)
    throw error
  }
}

// Function to fetch related products by category
export const getRelatedProductsByCategory = async category => {
  try {
    const response = await axios.get(`${API_URL}/item/related/${category}`)
    return response.data
  } catch (error) {
    console.error('Error fetching related products:', error.message)
    throw error
  }
}

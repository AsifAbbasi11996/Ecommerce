import axios from 'axios'

const API_URL = 'http://localhost:5000/item' // Update this to match your actual API URL

// Function to fetch all items
export const getAllItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`)
    return response.data
  } catch (error) {
    console.error('Error fetching the items:', error.message)
    throw error // Rethrow the error to handle it in the component
  }
}

// Function to add a new item
export const addItem = async formData => {
  try {
    const response = await axios.post(`${API_URL}/add`, formData, {
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
    const response = await axios.get(`${API_URL}/get/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching item with ID ${id}:`, error.message)
    throw error
  }
}

// Function to update an item by ID
export const updateItemById = async (id, updates) => {
  try {
    const response = await axios.put(`${API_URL}/update/${id}`, updates)
    return response.data
  } catch (error) {
    console.error(`Error updating item with ID ${id}:`, error.message)
    throw error
  }
}

// Function to delete an item by ID
export const deleteItemById = async id => {
  try {
    const response = await axios.delete(`${API_URL}/del/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error deleting item with ID ${id}:`, error.message)
    throw error
  }
}

// Function to delete an image from an item
export const deleteImageFromItem = async (id, imagePath) => {
  try {
    const response = await axios.delete(`${API_URL}/del/${id}/images`, {
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
    const response = await axios.post(`${API_URL}/add/${id}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  } catch (error) {
    console.error('Error adding images to item:', error.message)
    throw error
  }
}

// Function to fetch related products by category
export const getRelatedProductsByCategory = async category => {
  try {
    const response = await axios.get(`${API_URL}/related/${category}`)
    return response.data
  } catch (error) {
    console.error('Error fetching related products:', error.message)
    throw error
  }
}

import axios from 'axios'

// Base URL of your backend API (Make sure this is the correct URL for your server)
const BASE_URL = 'http://localhost:5000/slider' // Update this based on your API URL

// Set up axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Fetch all sliders
export const getAllSliders = async () => {
  try {
    const response = await axiosInstance.get('/all')
    return response.data // Return the list of sliders
  } catch (error) {
    console.error('Error fetching all sliders:', error.message)
    throw error
  }
}

// Fetch a single slider by ID
export const getSliderById = async id => {
  try {
    const response = await axiosInstance.get(`/get/${id}`)
    return response.data // Return the slider data
  } catch (error) {
    console.error('Error fetching slider by ID:', error.message)
    throw error
  }
}

// Add a new slider with image upload
export const addSlider = async formData => {
  try {
    const response = await axiosInstance.post('/add', formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // This allows the image upload
      }
    })
    return response.data // Return the saved slider data
  } catch (error) {
    console.error('Error adding slider:', error.message)
    throw error
  }
}

// Update an existing slider by ID
export const updateSliderById = async (id, formData) => {
  try {
    const response = await axiosInstance.put(`/update/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // This allows the image upload
      }
    })
    return response.data // Return the updated slider data
  } catch (error) {
    console.error('Error updating slider:', error.message)
    throw error
  }
}

// Delete a slider by ID
export const deleteSliderById = async id => {
  try {
    const response = await axiosInstance.delete(`/del/${id}`)
    return response.data // Return success message
  } catch (error) {
    console.error('Error deleting slider:', error.message)
    throw error
  }
}

// Delete a single image from the slider by ID
export const deleteSliderImage = async id => {
  try {
    const response = await axiosInstance.delete(`/del/${id}/image`)
    return response.data // Return success message
  } catch (error) {
    console.error('Error deleting slider image:', error.message)
    throw error
  }
}

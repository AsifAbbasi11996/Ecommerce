import axios from 'axios'

const API_URL = 'https://ecommerce-backend-production-f6c3.up.railway.app/slider' // Backend API URL for sliders

// Get all sliders
export const getSliders = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`)
    return response.data // Return the list of sliders
  } catch (error) {
    console.error('Error fetching sliders:', error.message)
    throw error
  }
}

// Get a single slider by ID
export const getSliderById = async id => {
  try {
    const response = await axios.get(`${API_URL}/get/${id}`)
    return response.data // Return the slider data
  } catch (error) {
    console.error('Error fetching slider:', error.message)
    throw error
  }
}

// Delete a slider by ID
export const deleteSlider = async id => {
  try {
    await axios.delete(`${API_URL}/delete/${id}`)
    return { message: 'Slider deleted successfully' } // Return a success message
  } catch (error) {
    console.error('Error deleting slider:', error.message)
    throw error
  }
}

// Add a new slider (including image upload)
export const addSlider = async sliderData => {
  const formData = new FormData()

  // Append the normal fields (like link, smalltext, etc.) to FormData
  formData.append('link', sliderData.link)
  formData.append('smalltext', sliderData.smalltext)
  formData.append('bigtext', sliderData.bigtext)

  // Append the image fields (files) to FormData
  if (sliderData.image && sliderData.image[0])
    formData.append('image', sliderData.image[0]) // Use the first image in the array
  if (sliderData.smallimage && sliderData.smallimage[0])
    formData.append('smallimage', sliderData.smallimage[0]) // Use the first small image
  if (sliderData.mobileImage && sliderData.mobileImage[0])
    formData.append('mobileImage', sliderData.mobileImage[0]) // Use the first mobile image

  try {
    const response = await axios.post(`${API_URL}/add`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // This is important for file uploads
      }
    })

    return response.data // Return the newly added slider data
  } catch (error) {
    console.error('Error adding slider:', error.message)
    throw error
  }
}

// Update a slider by ID (including image upload)
export const updateSlider = async (id, sliderData) => {
  try {
    const response = await axios.put(`${API_URL}/update/${id}`, sliderData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Ensure the request is sent with the right content type for file uploads
      }
    })
    return response.data // Return the updated slider data
  } catch (error) {
    console.error('Error updating slider:', error.message)
    throw error
  }
}

// Delete an image from a slider by ID
export const deleteSliderImage = async id => {
  try {
    const response = await axios.delete(`${API_URL}/del/${id}/image`)
    return response.data // Return a success message
  } catch (error) {
    console.error('Error deleting slider image:', error.message)
    throw error
  }
}

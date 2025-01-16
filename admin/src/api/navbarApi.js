import axios from 'axios'

const API_URL = 'https://ecommerce-backend-production-f6c3.up.railway.app/navbar'

// Get all nav items
export const getNavItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`)
    return response.data // Return the data directly
  } catch (error) {
    console.error('Error fetching nav items', error)
    throw error // Throw error so that it can be handled in the calling component
  }
}

// Get a single nav item by id
export const getNavItemById = async id => {
  try {
    const response = await axios.get(`${API_URL}/get/${id}`)
    return response.data // Return the nav item data
  } catch (error) {
    console.error('Error fetching nav item by ID', error)
    throw error
  }
}

// Create a new nav item
export const createNavItem = async navItemData => {
  try {
    const response = await axios.post(`${API_URL}/add`, navItemData)
    return response.data // Return the created nav item
  } catch (error) {
    console.error('Error creating nav item', error)
    throw error
  }
}

// Update an existing nav item
export const updateNavItem = async (id, navItemData) => {
  try {
    const response = await axios.put(`${API_URL}/update/${id}`, navItemData)
    return response.data // Return the updated nav item
  } catch (error) {
    console.error('Error updating nav item', error)
    throw error
  }
}

// Delete a nav item
export const deleteNavItem = async id => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${id}`)
    return response.data // Return the delete confirmation message
  } catch (error) {
    console.error('Error deleting nav item', error)
    throw error
  }
}

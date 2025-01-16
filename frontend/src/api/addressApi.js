import axios from 'axios'

const API_URL = 'https://ecommerce-backend-production-f6c3.up.railway.app/address'

// Get all addresses for a specific user
export const getAddressByUserId = async userId => {
  const response = await axios.get(`${API_URL}/get/user/${userId}`)
  return response.data
}

// Update an address by ID
export const updateAddress = async (addressId, updatedData) => {
  const response = await axios.put(
    `${API_URL}/update/${addressId}`,
    updatedData
  )
  return response.data
}

// Add a new address
export const addAddress = async addressData => {
  const response = await axios.post(`${API_URL}/add`, addressData)
  return response.data
}

// Get address by ID
export const getAddressById = async addressId => {
  const response = await axios.get(`${API_URL}/get/${addressId}`)
  return response.data
}

// Delete an address by ID
export const deleteAddress = async addressId => {
  const response = await axios.delete(`${API_URL}/delete/${addressId}`)
  return response.data
}

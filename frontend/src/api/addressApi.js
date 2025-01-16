import axios from 'axios'

import { API_URL } from '../utils/baseUrl'

// Get all addresses for a specific user
export const getAddressByUserId = async userId => {
  const response = await axios.get(`${API_URL}/address/get/user/${userId}`)
  return response.data
}

// Update an address by ID
export const updateAddress = async (addressId, updatedData) => {
  const response = await axios.put(
    `${API_URL}/address/update/${addressId}`,
    updatedData
  )
  return response.data
}

// Add a new address
export const addAddress = async addressData => {
  const response = await axios.post(`${API_URL}/address/add`, addressData)
  return response.data
}

// Get address by ID
export const getAddressById = async addressId => {
  const response = await axios.get(`${API_URL}/address/get/${addressId}`)
  return response.data
}

// Delete an address by ID
export const deleteAddress = async addressId => {
  const response = await axios.delete(`${API_URL}/address/delete/${addressId}`)
  return response.data
}

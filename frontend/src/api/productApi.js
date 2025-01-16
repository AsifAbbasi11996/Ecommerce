import axios from 'axios'

const API_URL = 'https://ecommerce-backend-production-f6c3.up.railway.app/product'

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`)
    return response.data
  } catch (error) {
    console.error('Error Fetching the products')
  }
}

export const getProductById = async id => {
  try {
    const response = await axios.get(`${API_URL}/get/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error getting product by this id ${id}`, error)
  }
}

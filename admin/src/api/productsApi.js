import axios from 'axios'

const API_URL = 'http://localhost:5000/product'

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

import axios from 'axios'
import { API_URL } from '../utils/baseUrl'



export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/product/all`)
    return response.data
  } catch (error) {
    console.error('Error Fetching the products')
  }
}

export const getProductById = async id => {
  try {
    const response = await axios.get(`${API_URL}/product/get/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error getting product by this id ${id}`, error)
  }
}

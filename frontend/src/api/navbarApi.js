import axios from 'axios'
import { API_URL } from '../utils/baseUrl'


export const getAllNavbar = async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/navbar/all`)
    return response.data
  } catch (error) {
    console.error('Error of fetching navbar', error)
  }
}
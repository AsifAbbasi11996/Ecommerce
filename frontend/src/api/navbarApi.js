import axios from 'axios'

const API_URL = 'https://ecommerce-backend-production-f6c3.up.railway.app/navbar'

export const getAllNavbar = async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/all`)
    return response.data
  } catch (error) {
    console.error('Error of fetching navbar', error)
  }
}

import axios from 'axios'

const API_URL = 'http://localhost:5000/navbar'

export const getAllNavbar = async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/all`)
    return response.data
  } catch (error) {
    console.error('Error of fetching navbar', error)
  }
}

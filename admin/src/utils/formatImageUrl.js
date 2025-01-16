// formatImageUrl.js

const API_URL = 'https://ecommerce-backend-production-f6c3.up.railway.app/' // Base URL for the server

export const formatImageUrl = imagePath => {
  // Format the image path to replace backslashes with forward slashes
  const formattedUrl = imagePath.replace(/\\+/g, '/') // Converts '\\' to '/'

  const fullUrl = `${API_URL}${formattedUrl}` // Combine base URL with formatted image path

  return fullUrl // Return the full URL
}

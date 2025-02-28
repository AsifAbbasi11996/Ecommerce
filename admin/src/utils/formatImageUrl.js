import { API_URL } from "./baseUrl"

export const formatImageUrl = imagePath => {
  if (!imagePath || typeof imagePath !== 'string') return '' // Return empty if no valid imagePath

  // Normalize the backslashes to forward slashes for URL compatibility
  const formattedPath = imagePath.replace(/\\/g, '/')

  // Assuming your server is serving static files from the "uploads" directory
  const baseUrl = `${API_URL}/`

  return baseUrl + formattedPath // Return the full URL path to the image
}

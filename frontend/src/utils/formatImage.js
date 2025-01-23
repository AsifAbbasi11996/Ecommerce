import { API_URL } from './baseUrl'

export const formatImageUrl = imagePath => {
  if (!imagePath || typeof imagePath !== 'string') return '' // Return empty string if imagePath is invalid

  // Normalize backslashes to forward slashes for URL compatibility
  const formattedPath = imagePath.replace(/\\/g, '/') // For Windows-style paths

  // Return the full URL path to the image
  return `${API_URL}/${formattedPath}`
}

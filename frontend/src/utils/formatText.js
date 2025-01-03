// Function to truncate the product name based on character limit
export const truncateText = (text, charLimit = 75) => {
  if (text.length <= charLimit) {
    return text // Return the text as is if it's within the character limit
  }
  return text.slice(0, charLimit) + '...' // Slice the text and add "..."
}

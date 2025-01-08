export const formatItemNameForUrl = itemName => {
  return itemName
    .toLowerCase() // Convert to lowercase
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, '') // Remove any special characters (optional)
}

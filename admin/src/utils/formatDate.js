export const formatDate = date => {
  const parsedDate = new Date(date);
  // Check if the parsed date is valid
  if (isNaN(parsedDate)) {
    return "Invalid date"; // Return a fallback if the date is invalid
  }
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(parsedDate);
}

export const formatDate = dateStr => {
  // Parse the input date string into a Date object
  const date = new Date(dateStr)

  // Array of month names
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  // Get the individual components of the date
  const month = months[date.getMonth()] // Get the month (0-based index)
  const day = date.getDate() // Get the day of the month
  const year = date.getFullYear() // Get the full year

  // Return the formatted date string
  return `${month} ${day}, ${year}`
}

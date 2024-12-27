export const formatDate = dateStr => {
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

  const [month, day, year] = dateStr
    .split('/')
    .map(value => parseInt(value, 10))
  const formattedDate = `${months[month - 1]} ${day}, ${year}`

  return formattedDate
}

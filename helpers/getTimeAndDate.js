export const timeAndDate = () => {
  const date = new Date()
  const dateTime = date.toLocaleDateString('en-US', {
    hour12: true,
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  const dateOnly = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })

  return {
    dateTime,
    dateOnly
  }
}

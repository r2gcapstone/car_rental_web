export const formatDoubleDigit = (args) => ('0' + (args + 1)).slice(-2)

export const formatDateCreated = (dateCreated) => {
  const date = new Date(dateCreated * 1000)

  const year = date.getFullYear()
  const month = formatDoubleDigit(date.getMonth())
  const day = formatDoubleDigit(date.getDate())

  const formattedDate =
    dateCreated !== undefined ? `${month}/${day}/${year}` : ''

  return formattedDate
}

const formatDoubleDigit = (args: number): string => ('0' + (args + 1)).slice(-2)

export const formatDateCreated = (dateCreated: number): string => {
  const date = new Date(dateCreated * 1000)

  const year = date.getFullYear()
  const month = formatDoubleDigit(date.getMonth())
  const day = formatDoubleDigit(date.getDate())

  const formattedDate = `${month}/${day}/${year}`

  return formattedDate
}

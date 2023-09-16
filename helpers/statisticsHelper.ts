import { AccountDataTypes } from './types'

export const findHighestRegisteredDate = <FormData extends AccountDataTypes>(
  userData: FormData[]
): {
  highestCount: number
} => {
  const userCountByDate: Record<string, number> = {}

  userData.forEach((user) => {
    const registrationDate = user.dateCreated as string

    if (!userCountByDate[registrationDate]) {
      userCountByDate[registrationDate] = 0
    }

    userCountByDate[registrationDate]++
  })

  const highestCount = Math.max(...Object.values(userCountByDate))

  return {
    highestCount
  }
}

export const findHighestRegisteredPerMonth = <
  FormData extends AccountDataTypes
>(
  userData: FormData[]
): { highestCountMonths: Record<string, number> } => {
  const userCountByMonth: Record<string, number> = {}

  userData.forEach((user) => {
    const registrationDate = new Date(user.dateCreated)
    const year = registrationDate.getFullYear()
    const month = registrationDate.getMonth() + 1 // Adding 1 because getMonth() returns 0-based month
    const key = `${year}-${month}`

    if (!userCountByMonth[key]) {
      userCountByMonth[key] = 0
    }

    userCountByMonth[key]++
  })

  let highestCount = 0
  const highestCountMonths: Record<string, number> = {}

  for (const key in userCountByMonth) {
    const count = userCountByMonth[key]

    if (count > highestCount) {
      highestCount = count
      highestCountMonths[key] = count
    }
  }

  return { highestCountMonths }
}

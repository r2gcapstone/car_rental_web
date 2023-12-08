import {
  collection,
  query,
  getDocs,
  where,
  Timestamp
} from 'firebase/firestore'
import { db } from 'services'

//TODO: fix status index filter

export const usefetchBargraphData = async (status1, status2) => {
  try {
    const rentalsCollection = collection(db, 'rentals')
    const currentYear = new Date().getFullYear()

    const months = Array.from({ length: 12 }, (_, i) => i + 1) // Array representing 12 months

    const monthlyData = []

    for (const monthIndex of months) {
      const firstDayOfMonth = new Date(currentYear, monthIndex - 1, 1)
      const lastDayOfMonth = new Date(currentYear, monthIndex, 0)

      const queryRef = query(
        rentalsCollection,
        where('dateCreated', '>=', Timestamp.fromDate(firstDayOfMonth)),
        where('dateCreated', '<=', Timestamp.fromDate(lastDayOfMonth))
        // where('status', '==', 'finised') // currently has issue
      )

      const querySnapshot1 = await getDocs(queryRef)

      const monthName = firstDayOfMonth.toLocaleString('default', {
        month: 'long'
      })

      const monthData = {
        month: monthName.charAt(0).toUpperCase() + monthName.slice(1), // Capitalize first letter
        size: querySnapshot1.size
      }

      monthlyData.push(monthData)
    }

    return monthlyData
  } catch (error) {
    return {
      error: true,
      message: error.message,
      status: error.code
    }
  }
}

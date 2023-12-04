import { collection, getDocs } from 'firebase/firestore'
import { db } from 'services/firebase'

export const getAverageSubscriptionCountPerMonth = async () => {
  try {
    const subscriptionCollection = collection(db, 'subscription')
    const querySnapshot = await getDocs(subscriptionCollection)

    // Object to store the counts for each month
    const monthCounts = {}

    querySnapshot.forEach((doc) => {
      const dateCreated = doc.data().dateCreated.toDate()
      const month = dateCreated.getMonth() + 1
      const year = dateCreated.getFullYear()

      const monthKey = `${year}-${month}`

      // Increment count for the month
      monthCounts[monthKey] = (monthCounts[monthKey] || 0) + 1
    })

    const uniqueMonths = Object.keys(monthCounts).length
    const totalSubscriptions = Object.values(monthCounts).reduce(
      (acc, count) => acc + count,
      0
    )

    const averageSubscriptionsPerMonth = totalSubscriptions / uniqueMonths

    return averageSubscriptionsPerMonth
  } catch (error) {
    return {
      error: true,
      message: error.message,
      status: error.code
    }
  }
}

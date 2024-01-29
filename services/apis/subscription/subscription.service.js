import swal from 'sweetalert2'
import {
  collection,
  setDoc,
  DocumentData,
  doc,
  query,
  updateDoc,
  Timestamp,
  getDocs,
  where
} from 'firebase/firestore'
import { db } from 'services/firebase'
import { getAverageSubscriptionCountPerMonth } from 'helpers'

export const approveSubscriptionRequest = async (key, value, docId, carId) => {
  console.log(carId)

  let dateUpdated = new Date()
  dateUpdated = Timestamp.fromDate(dateUpdated)

  try {
    // Update the subscription document
    await updateDoc(doc(db, 'subscription', docId), {
      [key]: value,
      dateUpdated: value && dateUpdated
    })

    let bool = value === 'approved'

    // Update the car's status in subscription
    await updateDoc(doc(db, 'cars', carId), {
      isSubscribed: bool
    })

    return {
      message: 'Update success!',
      error: false,
      status: 200
    }
  } catch (error) {
    console.error('Error updating data:', error)
    return {
      error: true,
      message: error.message,
      status: error.code
    }
  }
}

export const rejectSubscriptionRequest = async (key, value, docId) => {
  let dateUpdated = new Date()
  dateUpdated = Timestamp.fromDate(dateUpdated)

  try {
    // Update the subscription document
    await updateDoc(doc(db, 'subscription', docId), {
      [key]: value,
      dateUpdated: value && dateUpdated
    })

    let bool = null
    if (value === 'approved') {
      bool = true
    } else {
      bool = false
    }

    return {
      message: 'Update success!',
      error: false,
      status: 200
    }
  } catch (error) {
    return {
      error: true,
      message: error.message,
      status: error.code
    }
  }
}

export const getSubTotalStat = async (subscriptionType) => {
  try {
    const subscriptionCollection = collection(db, 'subscription')
    let queryRef = query(subscriptionCollection)

    if (subscriptionType === '1 MONTH') {
      subscriptionType = 'MONTHLY'
    }

    if (subscriptionType === 'Subscription Count') {
      // Do Nothing
    } else if (subscriptionType === 'Average Subscription Count (Per Month)') {
      const subscriptionCountPerMonth =
        await getAverageSubscriptionCountPerMonth()
      return subscriptionCountPerMonth
    } else {
      queryRef = query(
        queryRef,
        where('subscriptionType', '==', subscriptionType)
      )
    }

    const querySnapshot = await getDocs(queryRef)
    const subscriptionCount = querySnapshot.size

    return subscriptionCount
  } catch (error) {
    return {
      error: true,
      message: error.message,
      status: error.code
    }
  }
}

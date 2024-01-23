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
  where,
  getDoc
} from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { auth, db } from 'services/firebase'
import { getAverageSubscriptionCountPerMonth } from 'helpers'

export const updateVehicleField = async (key, value, docId, cardId) => {
  let dateUpdated = new Date()
  dateUpdated = Timestamp.fromDate(dateUpdated)

  try {
    // Update the subscription document
    await updateDoc(doc(db, 'cars', docId), {
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

// Function to get user data using its userId
export const getVehicleData = async (docId) => {
  try {
    const carDoc = doc(db, 'cars', docId)
    const carSnapshot = await getDoc(carDoc)
    const car = carSnapshot.data()
    return car
  } catch (error) {
    return { error: true, message: error.message, status: error.code }
  }
}

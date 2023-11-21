import swal from 'sweetalert2'
import {
  collection,
  setDoc,
  DocumentData,
  doc,
  updateDoc,
  Timestamp,
  getDoc
} from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db } from 'services/firebase'

export const updateSubscriptionField = async (key, value, docId, cardId) => {
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

    // Update the car's status in subscription
    await updateDoc(doc(db, 'cars', cardId), {
      isSubscribed: bool
    })

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

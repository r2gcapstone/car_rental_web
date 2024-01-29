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

import { auth, db } from 'services/firebase'

export const getRentingDoc = async (docId) => {
  try {
    // Get a reference to the 'rentals' collection
    const rentalsRef = collection(db, 'rentals')

    // Create a query against the collection
    const q = query(rentalsRef, where('docId', '==', docId))

    // Execute the query
    const querySnapshot = await getDocs(q)

    // If no rentals were found, return a message indicating this
    if (querySnapshot.empty) {
      return {
        error: false,
        message: 'No rental records found!',
        status: 204
      }
    }

    // You can use the docs property of the querySnapshot object to get all the documents in the result
    const docs = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() }
    })

    return docs[0]
  } catch (error) {
    return { error: true, message: error.message, status: error.code }
  }
}

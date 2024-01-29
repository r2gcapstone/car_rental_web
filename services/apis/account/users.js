// Function to get user data using its userId
import { auth, db } from 'services/firebase'
import { updatePassword, updateEmail } from 'firebase/auth'
import { updateDoc, doc, getDoc, Timestamp } from 'firebase/firestore'

export const getAdminData = async () => {
  const userId = auth?.currentUser?.uid
  try {
    const userDoc = doc(db, 'adminUsers', userId)
    const userSnapshot = await getDoc(userDoc)
    const user = userSnapshot.data()

    return user
  } catch (error) {
    return { error: true, message: error.message, status: error.code }
  }
}

export const getUserData = async (docId) => {
  console.log(docId)
  try {
    const userDoc = doc(db, 'users', docId)
    const userSnapshot = await getDoc(userDoc)
    const user = userSnapshot.data()

    return user
  } catch (error) {
    return { error: true, message: error.message, status: error.code }
  }
}

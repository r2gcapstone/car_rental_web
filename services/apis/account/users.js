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

export const updateUserFeild = async (key, value, docId) => {
  try {
    const user = auth.currentUser
    let dateUpdated = new Date()
    dateUpdated = Timestamp.fromDate(dateUpdated)

    // Update the user document
    await updateDoc(doc(db, 'users', docId), {
      [key]: value,
      dateUpdated: value && dateUpdated
    })

    return {
      message: 'Update success!',
      error: false,
      status: 200
    }
  } catch (error) {
    return { error: true, message: error.message, status: error.code }
  }
}

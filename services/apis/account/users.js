// Function to get user data using its userId
import { auth, db } from 'services/firebase'
import { updatePassword, updateEmail } from 'firebase/auth'
import { updateDoc, doc, getDoc, Timestamp } from 'firebase/firestore'
import { sendPasswordResetEmail } from 'firebase/auth'

export const getAdminData = async () => {
  const userId = auth?.currentUser?.uid
  try {
    const userDoc = doc(db, 'adminUsers', userId)
    const userSnapshot = await getDoc(userDoc)

    if (userSnapshot.exists()) {
      const user = userSnapshot.data()
      return { ...user, id: userSnapshot.id }
    } else {
      return { error: true, message: 'User not found', status: 404 }
    }
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

export const updateAllUserData = async (data) => {
  try {
    const user = auth.currentUser
    const date = new Date()
    const dateUpdated = Timestamp.fromDate(date)

    // update email in auth
    if (data.email) {
      try {
        await updateEmail(user, data.email)
      } catch (error) {
        alert(error)
      }
    }

    let image = data.imageUrl
    if (data.imageUrl.startsWith('file://')) {
      try {
        const result = await updateUserImage(data.imageUrl)
        //replace with new image
        image = result.imageUrl
      } catch (error) {
        console.log(error)
      }
    }

    await updateDoc(doc(db, 'users', user.uid), {
      ...data,
      imageUrl: image,
      dateUpdated: dateUpdated
    })

    return {
      message: 'update success!',
      error: false,
      status: 200,
      imageUrl: image
    }
  } catch (error) {
    alert(error)
    return { error: true, message: error.message, status: error.code }
  }
}

export const changePass = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email)
    return {
      message: 'Change pass request sent, check your email to proceed !',
      error: false,
      status: 200
    }
  } catch (error) {
    return { error: true, message: error.message, status: error.code }
  }
}

export const updateUserPassword = async (newPassword) => {
  try {
    const user = auth.currentUser

    if (user) {
      await updatePassword(user, newPassword)
      return {
        message: 'Password update success!',
        error: false,
        status: 200
      }
    } else {
      throw new Error('No user is currently signed in.')
    }
  } catch (error) {
    return { error: true, message: error.message, status: error.code }
  }
}

export const updateUserImage = async (value) => {
  try {
    const resizedImageUrl = await resizeImage(value, 640)
    const downloadURL = await uploadImage(resizedImageUrl, 'userProfile')

    return {
      imageUrl: downloadURL,
      message: 'update success!',
      error: false,
      status: 200
    }
  } catch (error) {
    return { error: true, message: error.message, status: error.code }
  }
}

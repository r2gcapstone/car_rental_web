import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { SharedServices } from '../shared'
import { auth } from 'services/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from 'services/firebase'
import swal from 'sweetalert2'

export class AuthServices {
  public uploadAvatar = async (docId: string, image: File[]) => {
    try {
      const storage = getStorage()
      const documentRef = doc(db, 'users', docId)
      const imageRef = ref(storage, `avatarProfile/${image[0].name}`)
      const uploadAvatar = await uploadBytes(imageRef, image[0])
      const getUrl = await getDownloadURL(uploadAvatar.ref)

      await updateDoc(documentRef, {
        imageUrl: getUrl
      })

      return getUrl
    } catch (error) {
      console.log(error)
      const newError = new Error()
      swal.fire({
        title: 'ERROR!',
        text: newError.message,
        icon: 'error'
      })
    }
  }

  public authRegister = async <FormValues>(
    email: string,
    password: string,
    data: FormValues
  ) => {
    try {
      const { saveDocument } = new SharedServices()
      const config = { email, password, ...data }
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      response &&
        saveDocument({
          collectionName: 'users',
          data: config,
          authId: response?.user?.uid
        })

      return {
        authId: response?.user?.uid
      }
    } catch (error) {
      swal.fire({
        title: 'ERROR!',
        text: 'email already exist.',
        icon: 'error'
      })
    }
  }

  public signOut = async () => {
    auth.signOut()
  }

  public signInService = async (email: string, password: string) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password)
      const token = auth.currentUser?.getIdToken()

      return {
        response,
        token
      }
    } catch (error) {
      const newError = error as Error
      swal.fire({
        title: 'ERROR!',
        text: newError.message,
        icon: 'error'
      })
    }
  }
}

import swal from 'sweetalert2'
import {
  collection,
  setDoc,
  DocumentData,
  doc,
  updateDoc
} from 'firebase/firestore'
import { db } from 'services/firebase'

export class SharedServices {
  public saveDocument = async <FormValue extends DocumentData>(args: {
    data: FormValue
    collectionName: string
    authId: string
  }) => {
    try {
      const { data, collectionName, authId } = args

      const customId = collection(db, collectionName).id
      const databaseRef = doc(db, collectionName, authId || customId)
      const response = await setDoc(databaseRef, data)

      return response
    } catch (error) {
      const newError = new Error()
      swal.fire({
        title: 'ERROR!',
        text: newError.message,
        icon: 'error'
      })
    }
  }

  public updateDocument = async <FormValue extends DocumentData>(args: {
    docId: string
    data: FormValue
    collectionName: string
  }) => {
    try {
      const { docId, data, collectionName } = args

      const documentRef = doc(db, collectionName, docId)
      await updateDoc(documentRef, {
        ...data
      })
    } catch (error) {
      const newError = new Error()
      swal.fire({
        title: 'ERROR!',
        text: newError.message,
        icon: 'error'
      })
    }
  }
}

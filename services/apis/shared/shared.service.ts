import swal from 'sweetalert2'
import { collection, setDoc, DocumentData, doc } from 'firebase/firestore'
import { db } from 'services/firebase'

export class SharedServices {
  public saveDocument = async <FormValue extends DocumentData>(args: {
    data: FormValue
    collectionName: string
    authId: string
  }) => {
    try {
      const customId = collection(db, args.collectionName).id
      const databaseRef = doc(db, args.collectionName, args.authId || customId)
      const response = await setDoc(databaseRef, args.data)

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
}

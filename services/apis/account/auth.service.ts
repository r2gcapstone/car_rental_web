import { createUserWithEmailAndPassword } from 'firebase/auth'
import { SharedServices } from '../shared'
import { auth } from 'services/firebase'
import swal from 'sweetalert2'

export class AuthServices {
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
}

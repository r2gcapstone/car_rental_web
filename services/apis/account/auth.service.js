import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { timeAndDate } from '../../../helpers';
import { db } from '../../../services/firebase';
import { SharedServices } from '../shared';
import { auth } from '../../../services/firebase';
import swal from 'sweetalert2';

class AuthServices {
  async uploadAvatar(docId, image) {
    try {
      const storage = getStorage();
      const documentRef = doc(db, 'adminUsers', docId);
      const imageRef = ref(storage, `avatarProfile/${image[0].name}`);
      const uploadAvatar = await uploadBytes(imageRef, image[0]);
      const getUrl = await getDownloadURL(uploadAvatar.ref);

      await updateDoc(documentRef, {
        imageUrl: getUrl
      });

      return getUrl;
    } catch (error) {
      console.log(error);
      const newError = new Error();
      swal.fire({
        title: 'ERROR!',
        text: newError.message,
        icon: 'error'
      });
    }
  }

  async authRegisterAdmin(email, password, data, image) {
    try {
      const { uploadNewImage } = new SharedServices();
      const { getUrl } = await uploadNewImage(image);
      const config = { ...data, imageUrl: getUrl };

      const response = await this.authRegister(email, password, config);

      return {
        authId: response?.authId
      };
    } catch (error) {
      swal.fire({
        title: 'ERROR!',
        text: 'email already exist.',
        icon: 'error'
      });
    }
  }

  async authRegister(email, password, data) {
    try {
      const { saveDocument } = new SharedServices();
      const { dateOnly } = timeAndDate();

      const config = {
        ...data,
        email,
        password,
        dateCreated: dateOnly,
        deactivatedAt: ''
      };

      const response = await createUserWithEmailAndPassword(auth, email, password);

      response &&
        saveDocument({
          collectionName: 'adminUsers',
          data: config,
          authId: response?.user?.uid
        });

      return {
        authId: response?.user?.uid
      };
    } catch (error) {
      swal.fire({
        title: 'ERROR!',
        text: 'email already exist.',
        icon: 'error'
      });
    }
  }

  async signOut() {
    auth.signOut();
  }

  async signInService(email, password) {
    try {
      const { getSpecificDoc } = new SharedServices();

      const response = await signInWithEmailAndPassword(auth, email, password);
      const token = await auth.currentUser?.getIdToken();

      const authId = auth.currentUser?.uid;

      const { isDeactivated } = await getSpecificDoc(authId);

      if (isDeactivated) {
        this.signOut();

        swal.fire({
          title: 'Error',
          text: 'this account is no longer working',
          icon: 'error'
        });
        return;
      }

      return {
        response,
        token
      };
    } catch (error) {
      const newError = error;
      swal.fire({
        title: 'ERROR!',
        text: newError.message,
        icon: 'error'
      });
    }
  }
}

import swal from 'sweetalert2';
import {
  collection,
  setDoc,
  doc,
  updateDoc,
  getDoc,
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from 'firebase/firestore';
import { AuthServices } from '../account';
import { db } from '../../../services/firebase';

class SharedServices {
  async getSpecificDoc(authId) {
    try {
      const docRef = doc(db, 'adminUsers', authId);
      const docSnap = await getDoc(docRef);

      const isDeactivated = docSnap && !!docSnap.data()?.deactivatedAt;

      return {
        isDeactivated
      };
    } catch (error) {
      const newError = new Error();
      swal.fire({
        title: 'ERROR!',
        text: newError.message,
        icon: 'error'
      });
    }
  }

  async uploadNewImage(image) {
    try {
      const storage = getStorage();
      const imageRef = ref(storage, `avatarProfile/${image[0].name}`);
      const uploadAvatar = await uploadBytes(imageRef, image[0]);
      const getUrl = await getDownloadURL(uploadAvatar.ref);

      return {
        getUrl
      };
    } catch (error) {
      const newError = new Error();
      swal.fire({
        title: 'ERROR!',
        text: newError.message,
        icon: 'error'
      });
    }
  }

  async saveDocument(args) {
    try {
      const { data, collectionName, authId } = args;

      const customId = collection(db, collectionName).id;
      const databaseRef = doc(db, collectionName, authId || customId);
      const response = await setDoc(databaseRef, data);

      return response;
    } catch (error) {
      const newError = new Error();
      swal.fire({
        title: 'ERROR!',
        text: newError.message,
        icon: 'error'
      });
    }
  }

  async updateDocument(args) {
    try {
      const { docId, data, collectionName } = args;

      const documentRef = doc(db, collectionName, docId);
      await updateDoc(documentRef, {
        ...data
      });
    } catch (error) {
      const newError = new Error();
      swal.fire({
        title: 'ERROR!',
        text: newError.message,
        icon: 'error'
      });
    }
  }
}

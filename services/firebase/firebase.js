import firebase from 'firebase/compat/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBDtIEEWidJlohVndtDuqWicR5_VCIYpSk',
  authDomain: 'car-rental-project-246ee.firebaseapp.com',
  projectId: 'car-rental-project-246ee',
  storageBucket: 'car-rental-project-246ee.appspot.com',
  messagingSenderId: '845241485062',
  appId: '1:845241485062:web:8f2c51f4373e85ca798087',
  measurementId: 'G-5ZD4FJE10D'
}

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth, app }

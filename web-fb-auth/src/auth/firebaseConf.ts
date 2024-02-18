import { initializeApp, type FirebaseOptions } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    // Bad docs.  This seems to only be for Realtime Database
  //databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
} satisfies FirebaseOptions )

const fsDB = getFirestore(app, 'lux-auth') // we are not using default instance
const auth = getAuth(app)

//auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)

/*
if (process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATOR === 'true') {
  firebase.functions().useEmulator('localhost', 5001)
  auth.useEmulator('http://localhost:9099')
}

export const requestPasswordUpdate = firebase.functions().httpsCallable('requestPasswordUpdate')
*/
export  { app, auth, fsDB }
//export default app
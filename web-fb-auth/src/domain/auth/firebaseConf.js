/**
 * For now we are using firebase 8.0 syntax
 * with version 9.3.  
 * 
 * 9.x fixes a few bugs and is needed by a module we use
 * /compat/X provides the same imports etc. as version 8.0
 */

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/functions'
import 'firebase/compat/firestore'

const app = firebase.initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    // Bad docs.  This seems to only be for Realtime Database
  //databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
})

const auth = firebase.auth()
const firestore = firebase.firestore()

auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)

if (process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATOR === 'true') {
  firebase.functions().useEmulator('localhost', 5001)
  auth.useEmulator('http://localhost:9099')
}

export const requestPasswordUpdate = firebase.functions().httpsCallable('requestPasswordUpdate')
export  { auth, firestore }
export default app
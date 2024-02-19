'use client'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

//import { getAuth } from 'firebase/auth'

import { auth } from '@/auth/firebaseConf'
import { type User, onAuthStateChanged, signOut} from 'firebase/auth'
import { ApplyTypography } from '@hanzo/ui/primitives'

// @ts-ignore
const FirebaseUIComp = dynamic(() => import('firebaseui-react'), {
  ssr: false,
})

const AuthComponent: React.FC = () => {

  const config = {
    // link back to this page for password resets
    continueUrl: document.location.href,
    signInOptions: [
      "emailpassword", 
      "google.com",
      'facebook.com',
      'github.com'
    ],
    callbacks: {
      signInSuccessWithAuthResult: (user: any) => {
        console.log("successfully authenticated", user);
      },
      signInFailure: (error: any) => {
        console.log("somtin went wrong :9 :((");
        console.error(error);
      },
    },
    formLabelStyles: { color: "#fff" },
  }

    // @ts-ignore
  return <FirebaseUIComp auth={auth} config={config} />
}

const AuthUiComponent: React.FC = () => {

  const [user, setUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <ApplyTypography className='w-full text-primary-fg'>
      {user ? (
        <div>
          <h3>Wellcome</h3>
          <button onClick={() => signOut(auth)}>Sign Out</button>
          <pre>{JSON.stringify({ user }, null, 2)}</pre>
        </div>
      ) : (
        <div className='w-full sm:w-96 mx-auto'>
          <AuthComponent />
        </div>
      )}
    </ApplyTypography>
  )
}

export default AuthUiComponent


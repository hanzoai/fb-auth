'use client'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

//import { getAuth } from 'firebase/auth'

import { auth } from './firebaseConf'
import { type User, onAuthStateChanged, signOut} from 'firebase/auth'
import { ApplyTypography, Button } from '@hanzo/ui/primitives'
import { useRouter } from 'next/navigation'

// @ts-ignore
const FirebaseUIComp = dynamic(() => import('firebaseui-react'), {
  ssr: false,
})

const AuthComponent: React.FC<{redirectUrl?: string}> = ({redirectUrl}) => {
  const router = useRouter()

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
        redirectUrl && router.push(redirectUrl)
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

const AuthUiComponent: React.FC<{redirectUrl?: string}> = ({redirectUrl}) => {

  const [user, setUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <ApplyTypography className='w-full text-primary-fg'>
      <div className='w-full max-w-[30rem] mx-auto flex flex-col gap-4'>
      {user ? (
        <>
          <h3>Welcome, {user.displayName}!</h3>
          <Button onClick={() => signOut(auth)} variant='outline'>Sign Out</Button>
        </>
      ) : (
        <AuthComponent redirectUrl={redirectUrl}/>
      )}
      </div>

    </ApplyTypography>
  )
}

export default AuthUiComponent


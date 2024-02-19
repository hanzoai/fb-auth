'use client'

import React  from 'react'
import { Main } from '@hanzo/ui/primitives'
import { observer } from 'mobx-react'

import { useAuthService } from '@/auth'
import AuthUiComponent from '@/auth-ui-component'

const UniversalPage = observer(() => {
  const auth = useAuthService()
  console.log('currentFirebaseUser: ', auth?.currentFirebaseUser?.displayName)
  console.log('currentHanzoUser: ', auth?.currentHanzoUser?.email)

  return (<>
    <Main className='md:flex-row md:gap-4'>
      <div className='w-full sm:w-96 mx-auto'>
      {auth?.currentFirebaseUser ? (<>
        <h3>Welcome {auth?.currentFirebaseUser.displayName}!</h3>
        <button onClick={() => {auth.logout()}}>Sign Out</button>
      </>) : (
        <AuthUiComponent />
      )} 
      </div>
    </Main>
  </>)
})

export default UniversalPage

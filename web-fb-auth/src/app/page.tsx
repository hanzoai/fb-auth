'use client'

import React  from 'react'
import { Main } from '@hanzo/ui/primitives'

import { useAuthService } from '@/auth'
import AuthUiComponent from '@/auth-ui-component'

const UniversalPage = () => {
  const {currentFirebaseUser, currentHanzoUser, } = useAuthService()
  console.log('currentFirebaseUser', currentFirebaseUser)
  console.log('currentHanzoUser', currentHanzoUser)

  return (<>
    <Main className='md:flex-row md:gap-4'>
      <AuthUiComponent />
    </Main>
  </>)
}

export default UniversalPage

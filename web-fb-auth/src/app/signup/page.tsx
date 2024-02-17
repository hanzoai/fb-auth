'use client'

import React  from 'react'
import { Main } from '@hanzo/ui/primitives'

import { Footer } from '@hanzo/ui/common'
import siteDef from '@/siteDef'
import { AuthServiceProvider } from '@/domain/auth'
import Signup from '@/components/Signup'

const SignupPage = () => {
  return (<>
    <Main className='md:flex-row md:gap-4 justify-center'>
      <AuthServiceProvider>
        <Signup/>
      </AuthServiceProvider>
    </Main>
    <Footer siteDef={siteDef} className='max-w-screen-2xl w-full pt-16 lg:mx-auto ' />
  </>)
}

export default SignupPage

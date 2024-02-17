'use client'

import React  from 'react'
import { Main } from '@hanzo/ui/primitives'

import { Footer } from '@hanzo/ui/common'
import siteDef from '@/siteDef'
import { ContentComponent } from '@hanzo/ui/blocks'
import loginForm from '@/content/login-form'
import { AuthServiceProvider } from '@/domain/auth'

const LoginPage = () => (<>
  <Main className='md:flex-row md:gap-4 justify-center'>
    <AuthServiceProvider>
      <ContentComponent blocks={loginForm} />
    </AuthServiceProvider>
  </Main>
  <Footer siteDef={siteDef} className='max-w-screen-2xl w-full pt-16 lg:mx-auto ' />
</>)

export default LoginPage

'use client'

import React  from 'react'
import { Main } from '@hanzo/ui/primitives'

import { Footer } from '@hanzo/ui/common'
import siteDef from '@/siteDef'
import updatePasswordForm from '@/content/update-password-form'
import { ContentComponent } from '@hanzo/ui/blocks'
import { AuthServiceProvider } from '@/domain/auth'

const UpdatePasswordPage = () => (<>
  <Main className='md:flex-row md:gap-4 justify-center'>
    <AuthServiceProvider>
      <ContentComponent blocks={updatePasswordForm} />
    </AuthServiceProvider>
  </Main>
  <Footer siteDef={siteDef} className='max-w-screen-2xl w-full pt-16 lg:mx-auto ' />
</>)

export default UpdatePasswordPage

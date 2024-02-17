'use client'

import React  from 'react'
import { Main } from '@hanzo/ui/primitives'

import { Footer } from '@hanzo/ui/common'
import siteDef from '@/siteDef'
import updatePasswordForm from '@/content/update-password-form'
import { ContentComponent } from '@hanzo/ui/blocks'

const UpdatePasswordPage = () => (<>
  <Main className='md:flex-row md:gap-4 justify-center'>
      <ContentComponent blocks={updatePasswordForm} />
  </Main>
  <Footer siteDef={siteDef} className='max-w-screen-2xl w-full pt-16 lg:mx-auto ' />
</>)

export default UpdatePasswordPage

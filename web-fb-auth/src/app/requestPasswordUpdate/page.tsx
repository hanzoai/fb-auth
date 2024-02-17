import React  from 'react'
import { Main } from '@hanzo/ui/primitives'

import { Footer } from '@hanzo/ui/common'
import siteDef from '@/siteDef'
import resetPasswordForm from '@/content/reset-password-form'
import { ContentComponent } from '@hanzo/ui/blocks'

const RequestPasswordUpdatePage = () => (<>
  <Main className='md:flex-row md:gap-4'>
    <ContentComponent blocks={resetPasswordForm} />
  </Main>
  <Footer siteDef={siteDef} className='max-w-screen-2xl w-full pt-16 lg:mx-auto ' />
</>)

export default RequestPasswordUpdatePage

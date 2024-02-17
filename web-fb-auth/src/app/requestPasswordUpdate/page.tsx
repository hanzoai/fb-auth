import React  from 'react'
import { ApplyTypography, Main } from '@hanzo/ui/primitives'

import { Footer } from '@hanzo/ui/common'
import siteDef from '@/siteDef'
import ResetPasswordForm from '@/components/ResetPasswordForm'

const RequestPasswordUpdatePage = () => (<>
  <Main className='md:flex-row md:gap-4'>
    <ApplyTypography className='w-full'>
      <ResetPasswordForm />
    </ApplyTypography>
  </Main>
  <Footer siteDef={siteDef} className='max-w-screen-2xl w-full pt-16 lg:mx-auto ' />
</>)

export default RequestPasswordUpdatePage

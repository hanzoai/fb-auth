import React  from 'react'
import { ApplyTypography, Main } from '@hanzo/ui/primitives'

import { Footer } from '@hanzo/ui/common'
import siteDef from '@/siteDef'
import SignupForm from '@/components/SignupForm'

const LoginPage = () => (<>
  <Main className='md:flex-row md:gap-4 '>
    <ApplyTypography>
      <SignupForm />
    </ApplyTypography>
  </Main>
  <Footer siteDef={siteDef} className='max-w-screen-2xl w-full pt-16 lg:mx-auto ' />
</>)

export default LoginPage

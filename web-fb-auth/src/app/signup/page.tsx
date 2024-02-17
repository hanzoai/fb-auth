import React  from 'react'
import { Main } from '@hanzo/ui/primitives'

import { Footer } from '@hanzo/ui/common'
import siteDef from '@/siteDef'
import signupForm from '@/content/signup-form'
import { ContentComponent } from '@hanzo/ui/blocks'

const LoginPage = () => (<>
  <Main className='md:flex-row md:gap-4 justify-center'>
    <ContentComponent blocks={signupForm} />
  </Main>
  <Footer siteDef={siteDef} className='max-w-screen-2xl w-full pt-16 lg:mx-auto ' />
</>)

export default LoginPage

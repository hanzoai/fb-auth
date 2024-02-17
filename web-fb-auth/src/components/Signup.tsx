'use client'

import * as z from 'zod'
import { useAuthService } from '@/auth'
import type { ClientOrgParams, CreateUserParams } from '../../../shared/types'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import SignupOrgForm from './SignupOrgForm'
import SignupUserForm from './SignupUserForm'

const formSchemaCreateUser = z.object({
  firstName: z.string().min(2, {
    message: 'First name must be at least 2 characters.',
  }),
  lastName: z.string().min(2, {
    message: 'Last name must be at least 2 characters.',
  }),
  email: z.string().email('This is not a valid email.'),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
  confirmPassword: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
}).refine(
  (values) => {
    return values.password === values.confirmPassword
  },
  {
    message: 'Passwords must match!',
    path: ['confirmPassword'],
  }
).refine(
  ({password}) => {
    const containsUppercase = (ch: string) => /[A-Z]/.test(ch)
    const containsLowercase = (ch: string) => /[a-z]/.test(ch)
    const containsSpecialChar = (ch: string) => /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch)
    let countOfUpperCase = 0, countOfLowerCase = 0, countOfNumbers = 0, countOfSpecialChar = 0
    for (const ch of password) {
      if (!isNaN(+ch)) countOfNumbers++
      else if (containsUppercase(ch)) countOfUpperCase++
      else if (containsLowercase(ch)) countOfLowerCase++
      else if (containsSpecialChar(ch)) countOfSpecialChar++
    }
    return countOfLowerCase > 0 &&
      countOfUpperCase > 0 &&
      countOfSpecialChar > 0 &&
      countOfNumbers > 0
  },
  {
    message: 'Password must have at least 1 uppercase letter, 1 lowercase letter, 1 digit (0-9), and one special character!',
    path: ['password'],
  }
)

const formSchemaCreateOrg = z.object({
  shortName: z.string().min(2, {
    message: 'Short name must be at least 2 characters.',
  }),
  adminEmail: z.string().email('This is not a valid email.'),
  fullOrgName: z.string().min(2, {
    message: 'Organization name must be at least 2 characters.',
  }),
  contactEmail: z.string().email('This is not a valid email.'),
  phone: z.string().optional()
})

const Signup = () => {
  const auth = useAuthService()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [step, setStep] = useState(0)
 
  async function onSubmitCreateUser(values: z.infer<typeof formSchemaCreateUser>) {
    try {
      await auth.createUser({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password
      } as CreateUserParams)
      setStep(1)
    } 
    catch (e) {
      console.error(e)
    }
  }

  async function onSubmitCreateOrg(values: z.infer<typeof formSchemaCreateOrg>) {
    try {
      await auth.createClientOrg({
        name: values.shortName,
        adminEmail: values.adminEmail,
        users: [],
        testOnly: false,
        details: {
          fullOrgName: values.fullOrgName,
          contactEmail: values.contactEmail,
          contactPhone: values.phone
        }
      } as ClientOrgParams)
      if (searchParams.get('origin')) {
        router.push(searchParams.get('origin') as string)
      }
    } 
    catch (e) {
      console.error(e)
    }
  }

  return step === 0 ? (
    <SignupUserForm onSubmit={onSubmitCreateUser} formSchema={formSchemaCreateUser}/>
  ) : (
    <SignupOrgForm onSubmit={onSubmitCreateOrg} formSchema={formSchemaCreateOrg}/>
  )
}

export default Signup
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@hanzo/ui/primitives'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useAuthService } from '@/domain/auth'
import type { CreateUserParams } from '../../../shared/types'
import { useRouter, useSearchParams } from 'next/navigation'

const formSchema = z.object({
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

const LoginForm = () => {
  const auth = useAuthService()
  const searchParams = useSearchParams()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
  })
 
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await auth.createUser({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password
      } as CreateUserParams)
      if (searchParams.get('origin')) {
        router.push(searchParams.get('origin') as string)
      }
    } 
    catch (e) {
      console.error(e)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
      <FormField
          control={form.control}
          name='firstName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input placeholder='First name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='lastName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder='Last name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          rules={{ required: 'Password is required' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder='Password' type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          rules={{ required: 'Password is required' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input placeholder='Confirm password' type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p>The use of this account is governed by Lux's <Link href='https://docs.google.com/document/d/1nBiOFMq1olWUKsgFjPRHvYIzPZsHdYjDgad0rc4Ryf4/preview'>terms and conditions</Link>.</p>
        <Button type='submit' className='w-full sm:w-fit sm:float-right !min-w-[150px] mt-4' disabled={!form.formState.isDirty}>Continue</Button>
      </form>
    </Form>
  )
}

export default LoginForm
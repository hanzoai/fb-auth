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
import { ContentComponent } from '@hanzo/ui/blocks'
import signupUserForm from '@/content/signup-user-form'

const SignupUserForm: React.FC<{
  onSubmit: any,
  formSchema: any
}> = ({onSubmit, formSchema}) => {
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

  const formMd = (
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

  return <ContentComponent blocks={signupUserForm(formMd)} />
}

export default SignupUserForm
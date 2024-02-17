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
import { useAuthService } from '@/auth'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

const formSchema = z.object({
  email: z.string().email('This is not a valid email.'),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
})

const LoginForm = () => {
  const auth = useAuthService()
  const searchParams = useSearchParams()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    },
  })
 
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await auth.requestPasswordUpdate(values.email)
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
        <Button type='submit' className='w-full sm:w-fit sm:float-right !min-w-[150px]' disabled={!form.formState.isDirty}>Login</Button>
      </form>
    </Form>
  )
}

export default LoginForm
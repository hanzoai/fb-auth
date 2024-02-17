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
import { useRouter, useSearchParams } from 'next/navigation'

const formSchema = z.object({
  email: z.string().email('This is not a valid email.'),
})

const ResetPasswordForm = () => {
  const auth = useAuthService()
  const searchParams = useSearchParams()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
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
        <Button type='submit' className='w-full sm:w-fit sm:float-right !min-w-[150px]' disabled={!form.formState.isDirty}>Send Link</Button>
      </form>
    </Form>
  )
}

export default ResetPasswordForm
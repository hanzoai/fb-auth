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
import signupOrgForm from '@/content/signup-org-form'
import { ContentComponent } from '@hanzo/ui/blocks'


const SignupOrgForm: React.FC<{
  onSubmit: any,
  formSchema: any
}> = ({onSubmit, formSchema}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shortName: '',
      adminEmail: '',
      fullOrgName: '',
      contactEmail: '',
    },
  })
 
  const formMd = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <FormField
          control={form.control}
          name='shortName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short name (no spaces)</FormLabel>
              <FormControl>
                <Input placeholder='Short name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='adminEmail'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Admin email</FormLabel>
              <FormControl>
                <Input placeholder='Admin email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='fullOrgName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Org Name</FormLabel>
              <FormControl>
                <Input placeholder='Full Org Name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='contactEmail'
          rules={{ required: 'Password is required' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact email</FormLabel>
              <FormControl>
                <Input placeholder='Contact email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='phone'
          rules={{ required: 'Password is required' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact phone (optional)</FormLabel>
              <FormControl>
                <Input placeholder='Contact phone' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full sm:w-fit sm:float-right !min-w-[150px] mt-4' disabled={!form.formState.isDirty}>Create</Button>
      </form>
    </Form>
  )

  return <ContentComponent blocks={signupOrgForm(formMd)} />
}

export default SignupOrgForm
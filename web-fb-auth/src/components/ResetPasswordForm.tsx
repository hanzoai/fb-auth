"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import {
  Button,
  Card,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@hanzo/ui/primitives"
import { useForm } from "react-hook-form"

const formSchema = z.object({
  email: z.string().email("This is not a valid email."),
})

const ResetPasswordForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })
 
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Card className="flex flex-col gap-5 items-center px-4 py-4 sm:px-12 sm:py-8 mx-auto max-w-[650px]">
      <h3 className="text-center">Reset Password</h3>
      <p className="!text-center">Please enter the email associated with your account. A password update link will be sent there.</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full sm:w-fit sm:float-right min-w-[150px]" disabled={!form.formState.isDirty}>Send Link</Button>
        </form>
      </Form>
    </Card>
  )
}

export default ResetPasswordForm
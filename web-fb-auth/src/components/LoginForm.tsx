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
import Link from "next/link"

const formSchema = z.object({
  email: z.string().email("This is not a valid email."),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })
 
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Card className="flex flex-col gap-4 items-center px-4 py-2 sm:px-12 sm:py-8">
      <h3 className="mb-6">Log in</h3>
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
          <FormField
            control={form.control}
            name="password"
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full sm:w-fit sm:float-right min-w-[150px]">Login</Button>
        </form>
      </Form>
      <Link href='/requestPasswordUpdate' className="self-end">Forgot password?</Link>
      <p className="self-end">Don't have an account? <Link href='/signup'>Join now</Link></p>
    </Card>
  )
}

export default LoginForm
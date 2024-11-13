'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import axios, { AxiosError } from "axios"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { ApiResponse } from "@/types/ApiResponse"
import { signInSchema } from "@/schemas/signInSchema"

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  // zod implementation
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // Handle on submit
  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true)
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/user/login`, data)
      axios.defaults.withCredentials = true;

      toast({
        title: "Success",
        description: response.data.message,
      })
      router.push("/log")
    } catch (error:any) {
      console.error("Error in signing in user:", error)
      const axiosError = error as AxiosError<ApiResponse>
      const err = axiosError.response?.data.message
      toast({
        title: "Error",
        description: err || "Error in signing in user",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold">Healthynfinity</h1>
          <p className="mb-4">Sign in to your account</p>
        </div>
        {/* Form starts here */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Create a new account?{" "}
            <Link href="/signup">
              <span className="text-blue-400 font-bold">Sign Up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn

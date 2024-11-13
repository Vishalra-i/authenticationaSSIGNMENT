'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useEffect , useState } from "react"
import { useForm } from "react-hook-form"
import * as z  from "zod"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios , {AxiosError} from "axios"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { ApiResponse } from "@/types/ApiResponse"


const Signup = () => {
  const [isSubmitting , setIsSubmitting] = useState(false)
  const router = useRouter();

  //zod implementation
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    }
  })

 
  
  //Handle on submit
  const onSubmit = async (data : z.infer<typeof signUpSchema>)=> {
     setIsSubmitting(true)
     try {
      console.log(process.env.NEXT_SERVER)
       const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/user/signup`,data)
       toast({
         title : "Success" ,
         description : response.data.message
       })
       router.push("/signin")
     } catch (error:any) {
       console.error("Error in signup user ::" + error)
       const axiosError = error as AxiosError<ApiResponse>
       let err = axiosError.response?.data.message 
       toast({
         title : "Error" ,
         description : err || "Error in signup user" ,
         variant : "destructive"
       })
     } finally {
       setIsSubmitting(false)
     }
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md ">
          {/* heading */}
           <div className="text-center">
            <h1 className="text-4xl font-extrabold"> Healthynfinity</h1>
            <p className="mb-4">Sign up to start your  adventure</p>
           </div>
           {/* Form statrt here */}
           <Form {...form}>
             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
             
             <FormField
                   control={form.control}
                   name="firstName"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel>First Name</FormLabel>
                       <FormControl>
                          <Input placeholder="First Name" {...field}  />
                       </FormControl>
                       <FormMessage />
                     </FormItem>
                   )}
                />
             <FormField
                   control={form.control}
                   name="lastName"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel>Last Name</FormLabel>
                       <FormControl>
                          <Input placeholder="Last Name" {...field}  />
                       </FormControl>
                       <FormMessage />
                     </FormItem>
                   )}
                />
             <FormField
                   control={form.control}
                   name="email"
                   render={({ field }) => (
                     <FormItem>
                       <FormLabel>Email</FormLabel>
                       <FormControl>
                          <Input placeholder="email" {...field}  />
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
                          <Input placeholder="password" type="password" {...field}  />
                       </FormControl>
                       <FormMessage />
                     </FormItem>
                   )}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {
                    isSubmitting ?<> <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please Wait </> : ('Signup')
                  }
                </Button>
             </form>
           </Form>

           <div className="text-center mt-4">
               <p>
                Already a member ? {' '} 
                <Link href="/signin" >
                   <span className="text-blue-400 font-bold">Sign in</span>
                </Link>
               </p>
           </div>

        </div>
    </div>
  )
}

export default Signup
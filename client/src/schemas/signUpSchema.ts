import {z} from "zod"


export const signUpSchema = z.object({
    firstName: z.string().min(2,"First name must be atleast 2 characters"),
    lastName: z.string().min(2 , "Last name must be atleast 2 characters"),
    email : z.string().email({message : 'Invalid email address'}),
    password : z.string().min(6, {message : "password must be atleast 6 characters"})
})
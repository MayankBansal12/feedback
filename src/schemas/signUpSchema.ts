import { z } from "zod";

export const emailValidation = z.string().email({ message: "Invalid email format!" })

export const signUpSchema = z.object({
    email: emailValidation,
    password: z.string().min(6, "Atleast 6 characters are required!")
    
})
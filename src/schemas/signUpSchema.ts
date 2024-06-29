import { z } from "zod";

export const emailValidation = z.string().email({ message: "Invalid email format!" })

export const signUpSchema = z.object({
    email: emailValidation,
    password: z.string().min(6, "Password should be atleast 6 characters!"),
    name: z.string().min(1, "Name should be atleast one character").max(50, "Name can't be more than 50 characters")
})
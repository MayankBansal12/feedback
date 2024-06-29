import { z } from "zod";
import { emailValidation } from "./signUpSchema";

export const loginSchema = z.object({
    email: emailValidation,
    password: z.string().min(1, { message: "Password can't be empty!" })
})
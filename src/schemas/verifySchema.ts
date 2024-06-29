import { z } from "zod";
import { emailValidation } from "./signUpSchema";

export const verifySchema = z.object({
    email: emailValidation,
    verifyCode: z.string().length(6, { message: "Verification code must be 6 digits!" })
})
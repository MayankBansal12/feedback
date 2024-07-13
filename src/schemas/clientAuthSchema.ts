import { z } from "zod"

export const clientAuthSchema = z.object({
    clientId: z.string().min(2, { message: "client id can't be empty!" }),
    clientSecret: z.string().min(2, { message: "client secret can't be empty!" })
})
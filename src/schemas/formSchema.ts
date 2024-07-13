import { z } from "zod"

export const formSchema = z.object({
    name: z.string().min(1, { message: "Name can't be empty" }),
    heading: z.string().min(1, { message: "Heading can't be empty" }),
    type: z.string().min(1, { message: "Type can't be empty" }),
    projectId: z.string().uuid({ message: "Invalid projectId" })
})
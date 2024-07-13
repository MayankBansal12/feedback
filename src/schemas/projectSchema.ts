import { z } from "zod"

export const projectSchema = z.object({
    name: z.string().min(1, { message: "project name can't be empty!" }),
    desc: z.string().optional()
})
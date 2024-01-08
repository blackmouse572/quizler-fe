import { z } from "zod"

const genders = ["Male", "Female", "Other"] as const

const SignUpSchema = z
  .object({
    name: z.string().min(1).max(20),
    email: z.string().email(),
    username: z.string().min(3).max(20),
    password: z.string().min(8),
    confirm: z.string().min(8),
    gender: z.enum(genders),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match"
  })

type SignUpSchemaType = z.infer<typeof SignUpSchema>

export default SignUpSchema
export type { SignUpSchemaType }

import { z } from "zod"

const genders = ["Male", "Female", "Other"] as const

const SignUpSchema = z
  .object({
    fullName: z.string(),
    username: z.string().min(3).max(20),
    password: z.string().min(8),
    dob: z.date(),
    confirm: z.string().min(8),
    email: z.string().email(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
  })

type SignUpSchemaType = z.infer<typeof SignUpSchema>

export default SignUpSchema
export type { SignUpSchemaType }

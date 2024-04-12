import { z } from "zod"

const genders = ["Male", "Female", "Other"] as const

const SignUpSchema = z
  .object({
    fullName: z.string().min(2, {
      message: "errors.signup.fullname",
    }),
    username: z.string().min(3, {
      message: "errors.signup.username",
    }).max(20, {
      message: "errors.signup.username",
    }),
    password: z.string().min(8, {
      message: "errors.signup.password",
    }),
    dob: z.date(),
    confirm: z.string().min(8, {
      message: "errors.signup.confirm_password",
    }),
    email: z.string().email({
      message: "errors.signup.email",
    }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "errors.signup.mismatch_password",
    path: ["confirm"],
  })

type SignUpSchemaType = z.infer<typeof SignUpSchema>

export default SignUpSchema
export type { SignUpSchemaType }

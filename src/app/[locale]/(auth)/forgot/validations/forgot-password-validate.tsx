import { z } from "zod"

const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: "errors.forgot_password.email",
  })
})

type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>

export default ForgotPasswordSchema
export type { ForgotPasswordSchemaType }

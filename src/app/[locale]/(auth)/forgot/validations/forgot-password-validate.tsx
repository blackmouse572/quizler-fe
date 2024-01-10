import { z } from "zod"

const ForgotPasswordSchema = z.object({
  email: z.string().email()
})

type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>

export default ForgotPasswordSchema
export type { ForgotPasswordSchemaType }

import { z } from "zod"

const VerifyForgotPasswordSchema = z
  .object({
    email: z.string().email()
  })
  
type VerifyForgotPasswordSchemaType = z.infer<typeof VerifyForgotPasswordSchema>

export default VerifyForgotPasswordSchema
export type { VerifyForgotPasswordSchemaType }

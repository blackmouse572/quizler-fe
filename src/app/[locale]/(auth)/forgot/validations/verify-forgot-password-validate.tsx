import { z } from "zod"

const VerifyForgotPasswordSchema = z
  .object({
    // TODO: change here
    // otpCode: z.number()
  })
  
type VerifyForgotPasswordSchemaType = z.infer<typeof VerifyForgotPasswordSchema>

export default VerifyForgotPasswordSchema
export type { VerifyForgotPasswordSchemaType }

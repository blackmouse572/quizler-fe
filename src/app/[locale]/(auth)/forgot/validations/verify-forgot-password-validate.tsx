import { z } from "zod"

const VerifyForgotPasswordSchema = z.object({
  pin: z.string().length(6).regex(/^\d+$/),
  email: z.string().email(),
})

type VerifyForgotPasswordSchemaType = z.infer<typeof VerifyForgotPasswordSchema>

export default VerifyForgotPasswordSchema
export type { VerifyForgotPasswordSchemaType }

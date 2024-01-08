import { z } from "zod"

const VerifySignUpSchema = z
  .object({
    otpCode: z.number().positive()
  })
  
type VerifySignUpSchemaType = z.infer<typeof VerifySignUpSchema>

export default VerifySignUpSchema
export type { VerifySignUpSchemaType }

import { z } from "zod"

const VerifySignUpSchema = z
  .object({
    // TODO: change here
    // otpCode: z.number()
  })
  
type VerifySignUpSchemaType = z.infer<typeof VerifySignUpSchema>

export default VerifySignUpSchema
export type { VerifySignUpSchemaType }

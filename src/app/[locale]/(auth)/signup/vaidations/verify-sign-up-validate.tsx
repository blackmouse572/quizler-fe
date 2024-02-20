import { z } from "zod"

const VerifySignUpSchema = z.object({
  token: z.string().length(6),
  email: z.string().email(),
})

type VerifySignUpSchemaType = z.infer<typeof VerifySignUpSchema>

export default VerifySignUpSchema
export type { VerifySignUpSchemaType }

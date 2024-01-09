import { z } from "zod"

const ChangePasswordSchema = z
  .object({
    password: z.string().min(8),
    confirm: z.string().min(8),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match"
  })

type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>

export default ChangePasswordSchema
export type { ChangePasswordSchemaType }

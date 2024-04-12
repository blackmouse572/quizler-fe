import { z } from "zod"

const SetNewPasswordSchema = z
  .object({
    password: z.string().min(8, {
      message: "errors.set_new_password.password",
    }),
    confirm: z.string().min(8, {
      message: "errors.set_new_password.confirm_password",
    }),
    token: z.string().min(8),
  })
  .refine((data) => data.password === data.confirm, {
    message: "errors.set_new_password.mismatch_password",
    path: ["confirm"],
  })

type SetNewPasswordSchemaType = z.infer<typeof SetNewPasswordSchema>

export default SetNewPasswordSchema
export type { SetNewPasswordSchemaType }

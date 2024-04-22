import { z } from "zod"

const LoginSchema = z.object({
  emailOrUsername: z.string().email(),
  password: z.string().min(6),
  rememberMe: z.boolean().default(false),
})

type LoginSchemaType = z.infer<typeof LoginSchema>

export default LoginSchema
export type { LoginSchemaType }

import { z } from "zod"

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type LoginSchemaType = z.infer<typeof LoginSchema>

export default LoginSchema
export type { LoginSchemaType }

import { z } from 'zod';

const SignUpSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
});

type SignUpSchemaType = z.infer<typeof SignUpSchema>;

export default SignUpSchema;
export type { SignUpSchemaType };

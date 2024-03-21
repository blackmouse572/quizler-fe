import { z } from "zod"

const CopyQuizBankSchema = z
  .object({
    name: z.string({
      required_error: "errors.invalid_type_received_undefined",
    }),
    copyTo: z.string(),
    classroom: z.string(),
  })

const getCopyQuizShema = (copyToOptions: [string, ...string[]], classroomOptions: [string, ...string[]]) => (z
    .object({
      name: z.string({
        required_error: "errors.invalid_type_received_undefined",
      }),
      copyTo: z.enum(copyToOptions),
      classroom: z.enum(classroomOptions),
    }))
type CopyQuizBankSchemaType = z.infer<typeof CopyQuizBankSchema>

export enum ECopyTo  {
  classroom="classroom",
  personal="personal"
}

export const copyToChoice = [
  {
    id: ECopyTo.classroom,
    text: "Classroom",
  },
  {
    id: ECopyTo.personal,
    text: "Personal",
  },
]
export default getCopyQuizShema
export type { CopyQuizBankSchemaType }

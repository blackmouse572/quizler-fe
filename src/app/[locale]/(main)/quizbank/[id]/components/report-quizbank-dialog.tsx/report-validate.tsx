import { z } from "zod"

const ReportQuizBankSchema = z.object({
  reason: z.string(),
  more_details: z
    .string()
    .min(10, {
      message: "Details must be at least 10 characters.",
    })
    .max(100, {
      message: "Details must not be longer than 100 characters.",
    }),
})
type ReportQuizBankSchemaType = z.infer<typeof ReportQuizBankSchema>

const getReportQuizSchema = (reasonOptions: [string, ...string[]]) =>
  z.object({
    reason: z.enum(reasonOptions),
    more_details: z
      .string()
      .min(10, {
        message: "Details must be at least 10 characters.",
      })
      .max(100, {
        message: "Details must not be longer than 100 characters.",
      }),
  })

export enum EReport {
  abuse = "abuse",
  inapproriate = "inappropriate",
  violate_intellectual = "violate_intellectual",
  other = "other",
}

export const reasonChoice = [
  {
    id: EReport.abuse,
    text: "Abuse",
  },
  {
    id: EReport.inapproriate,
    text: "Inappropriate",
  },
  {
    id: EReport.violate_intellectual,
    text: "Violates my intellectual property rights",
  },
  {
    id: EReport.other,
    text: "Other",
  },
]

export default getReportQuizSchema
export type { ReportQuizBankSchemaType }

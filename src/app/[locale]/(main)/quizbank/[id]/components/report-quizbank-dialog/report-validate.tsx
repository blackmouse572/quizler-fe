import { z } from "zod"

const ReportQuizBankSchema = z.object({
  reason: z.string(),
  more_details: z
    .string()
    .min(10, {
      message: "errors.report_quizbank.more_details.min_error",
    })
    .max(100, {
      message: "errors.report_quizbank.more_details.max_error",
    }),
})
type ReportQuizBankSchemaType = z.infer<typeof ReportQuizBankSchema>

const getReportQuizSchema = (reasonOptions: [string, ...string[]]) =>
  z.object({
    reason: z.enum(reasonOptions),
    more_details: z
      .string()
      .min(10, {
        message: "errors.report_quizbank.more_details.min_error",
      })
      .max(100, {
        message: "errors.report_quizbank.more_details.max_error",
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
    text: "form_report.reason.reason_choice.abuse",
  },
  {
    id: EReport.inapproriate,
    text: "form_report.reason.reason_choice.inapproriate",
  },
  {
    id: EReport.violate_intellectual,
    text: "form_report.reason.reason_choice.violate_intellectual",
  },
  {
    id: EReport.other,
    text: "form_report.reason.reason_choice.other",
  },
]

export default getReportQuizSchema
export type { ReportQuizBankSchemaType }

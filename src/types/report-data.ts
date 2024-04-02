import { User } from "."
import QuizBank from "./QuizBank"

export interface ReportType {
  id: string
  account: User
  quizBank: QuizBank
  created: string
  owner: User
  reason: string
}

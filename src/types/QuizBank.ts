import { User } from "@/types"

interface QuizBank {
  id: number
  bankName: string
  author: User
  description: string
  visibility: "Public" | "Private"
  rating: []
  averageRating: number
  quizCount?: number
  tags: []
  created: string
  updated: string | null
}

export type TAPIQuizResponse = {
  metadata: any
  data: Quiz[]
}

export interface Quiz {
  id: number
  quizBankId: number
  question: string
  answer: string
  explaination?: string
  created: string
  updated?: string
  quizBank?: QuizBank
}

export default QuizBank

export enum EFormAction {
  None = 0,
  Add = 1,
  Edit = 2,
}

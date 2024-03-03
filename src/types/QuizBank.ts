interface QuizBank {
  id: number
  bankName: string
  authorName: string | null
  quizes: []
  description: string
  visibility: "Public" | "Private"
  created: string
  updated: string | null
}

export type TAPIQuizResponse = {
  metadata: any,
  data: Quiz[]
}

export interface Quiz {
  id: number,
  quizBankId: number,
  question: string,
  answer: string,
  explaination?: string,
  created: string,
  updated?: string
}

export default QuizBank


export enum EQuizBankAction {
  None = 0,
  Add = 1,
  Edit = 2,
}
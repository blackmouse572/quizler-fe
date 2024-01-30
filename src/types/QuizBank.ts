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

export default QuizBank

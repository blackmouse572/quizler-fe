interface QuizBank {
  id: number
  bankName: string
  authorName: string
  author: {}
  quizes: []
  description: string
  visibility: "Public" | "Private"
  rating: []
  averageRating: number
  tags: []
  created: string
  updated: string | null
}

export default QuizBank

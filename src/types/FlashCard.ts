interface FlashCard {
  metadata: {
    skip: number
    take: number
    totals: number
    hasMore: boolean
  }
  data: [
    {
      id: string 
      quizBankId: string
      question: string
      answer: string
      explaination: string | null
      created: string | null
      updated: string | null
    },
  ]
}

export default FlashCard

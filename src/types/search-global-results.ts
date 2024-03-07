export type SearchGlobalResults = {
  quizzes: [
    {
      id: string
      quizBankId: string
      question: string
      answer: string
      explaination: string | null
      created: string
      updated: string | null
    },
  ]
  quizBanks: [
    {
      id: string
      bankName: string
      author: string
      description: string
      visibility: string
      rating: [
        {
          accountId: string
          star: number
        },
      ]
      averageRating: number
      tags: []
      quizCount: number
      created: string
      updated: string
    },
  ],
  posts: [],
  classrooms: []
}

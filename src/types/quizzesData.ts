export type QuizzesData =
  | [
      {
        id: string
        quizBank: {
          id: string
          bankName: string
          author: {
            id: string
            username: string
            fullName: string
            email: string
            avatar: string | null
            dob: string
            useAICount: number
            favoriteBankIds: []
            created: string
            updated: string | null
            isVerified: boolean
          }
          description: string
          visibility: string
          rating: []
          averageRating: number
          tags: []
          quizCount: number
          created: string
          updated: string | null
        }
        question: string
        answer: string
        explaination: string | null
        created: string
        updated: string | null
      },
    ]
  | null

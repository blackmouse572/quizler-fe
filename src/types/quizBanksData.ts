export type QuizBanksData =
  | [
      {
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
        rating: [
          {
            accountId: string
            star: number
          },
        ]
        averageRating: number
        tags: [string]
        quizCount: number
        created: string
        updated: string | null
      },
    ]
  | null

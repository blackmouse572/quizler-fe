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
      tags: [string]
      quizCount: number
      created: string
      updated: string
    },
  ]
  posts: [
    {
      id: string
      title: string
      content: string
      author: {
        id: string
        username: string
        fullName: string
        email: string
        avatar: string | null
        dob: string | null
        useAICount: number
        favoriteBankIds: []
        created: string | null
        updated: string | null
        isVerified: boolean
      }
      comments: [string]
      gameLink: string | null
      bankLink: string | null
      created: string
      updated: string | null
    },
  ]
  classrooms: [
    {
      id: string
      classname: string
      description: string
      account: {
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
      bankIds: [string]
      accountIds: [string]
      created: string
    },
  ]
}

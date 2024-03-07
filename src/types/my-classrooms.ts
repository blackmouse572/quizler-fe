export type MyClassrooms = {
  metadata: {
    skip: number
    take: number
    totals: number
    hasMore: boolean
  }
  data: [
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
      bankIds: []
      accountIds: []
      created: string | null
    },
  ]
}

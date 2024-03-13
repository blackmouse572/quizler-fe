export type UsersData =
  | [
      {
        id: string
        username: string
        fullName: string
        email: string
        avatar: string
        dob: string
        useAICount: number
        favoriteBankIds: []
        created: string | null
        updated: string | null
        isVerified: boolean
      },
    ]
  | null

export type ClassroomsData =
  | [
      {
        id: string
        classname: string
        description: string
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
        bankIds: [string]
        accountIds: [string]
        created: string
        studentNumber: number
        isStudentAllowInvite: boolean
      },
    ]
  | null

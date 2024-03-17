export type Post = {
  id: string
  title: string
  classroom: {
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
  }
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
  comments: [
    {
      id: string
      content: string
      author: {
        id: string
        username: string
        fullName: string
        email: string
        avatar: string | null
        dob: string
        useAICount: number
        favoriteBankIds: []
        created: string | null
        updated: string | null
        isVerified: boolean
      }
      postId: string
      created: string
      deleted: string | null
    },
  ]
  gameLink: string | null
  bankLink: string | null
  created: string
  updated: string | null
}

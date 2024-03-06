export interface User {
  id: number
  username: string
  fullName: string
  avatar: string | null
  dob: string
  email: string
  role: string
  useAICount: number
  favoriteBankIds: number[]
  created: string
  updated: string
  isVerified: boolean
  accessToken: Token
  refreshToken: Token
}

export interface Token {
  token: string
  expiredAt: number
}

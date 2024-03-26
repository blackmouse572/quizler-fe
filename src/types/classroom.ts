import { User } from "."

type ClassroomInvitation = {
  id: string
  classroomId: string
  code: string
  created: string
  expires: string
  isActivated: boolean
  isExpired: boolean
  revoked: boolean | null
}

type Classroom = {
  classname: string
  author: User
  id: string
  description: string
  bankIds: string[]
  isStudentAllowInvite?: boolean
  studentNumber?: number
  accountIds: string[]
  created: string
}

type ClassroomMembers = Omit<User, "accessToken" | "refreshToken" | "role">

type Game = {
  id: string
  gameName: string
  isTest: boolean
  classroomId: string
  quizBankId: string
  numberOfQuizzes: number
  status: string
  startTime: string
  endTime: string
  duration: number
  created: string
  updated: string
}

type ClassroomGameResults = {
  id: string
  gameId: string
  game: Game
  accountId: string
  account: User
  totalMark: number
  created: string
  updated: string
}

type TClassRoomCardRef = {
  setIsDelete: React.Dispatch<React.SetStateAction<boolean>>
}

export type {
  Classroom,
  ClassroomInvitation,
  TClassRoomCardRef,
  ClassroomMembers,
  Game,
  ClassroomGameResults,
}

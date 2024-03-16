import { User } from "@/types"

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
  account: User
  id: string
  description: string
  bankIds: string[]
  isStudentAllowInvite: boolean
  accountIds: string[]
  created: string
}

export type { Classroom, ClassroomInvitation }

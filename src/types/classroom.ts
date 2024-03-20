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
  author: User
  id: string
  description: string
  bankIds: string[]
  isStudentAllowInvite?: boolean
  studentNumber?: number
  accountIds: string[]
  created: string
}

type TClassRoomCardRef = {
  setIsDelete: React.Dispatch<React.SetStateAction<boolean>>
}

export type { Classroom, ClassroomInvitation, TClassRoomCardRef }

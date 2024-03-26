import { Classroom, User } from "@/types"
import QuizBank from "@/types/QuizBank"

export type Post = {
  id: string
  title: string
  classroom: Classroom
  content: string
  author: User
  comments: [Comment]
  created: string
  view: number
  updated: string | null
} & (PostQuizbank | PostGame)

export type PostQuizbank = {
  bankLink: string
  quizBank: QuizBank
  gameLink: never
  game: never
}

export type PostGame = {
  gameLink: string
  quizBank: never
  bankLink: never
  game: any // Todo: Define game type
}

export type Comment = {
  id: string
  content: string
  author: User
  postId: string
  deleted: string | null
  created: string
}

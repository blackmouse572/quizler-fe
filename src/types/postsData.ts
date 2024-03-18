import { Classroom, User } from "@/types"

export type Post = {
  id: string
  title: string
  classroom: Classroom
  content: string
  author: User
  comments: [Comment]
  gameLink: string | null
  bankLink: string | null
  created: string
  updated: string | null
}

export type Comment = {
  id: string
  content: string
  author: User
  postId: string
  deleted: string | null
  created: string
}

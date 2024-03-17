import { Post } from "@/types/postsData"
import { ClassroomsData } from "./classroomsData"
import { QuizBanksData } from "./quizBanksData"
import { QuizzesData } from "./quizzesData"
import { UsersData } from "./usersData"

export type SearchGlobalResults = {
  quizzes: QuizzesData
  quizBanks: QuizBanksData
  posts: Post
  classrooms: ClassroomsData
  users: UsersData
}

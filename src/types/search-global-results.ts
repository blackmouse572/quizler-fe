import { ClassroomsData } from "./classroomsData"
import { PostsData } from "./postsData"
import { QuizBanksData } from "./quizBanksData"
import { QuizzesData } from "./quizzesData"
import { UsersData } from "./usersData"

export type SearchGlobalResults = {
  quizzes: QuizzesData
  quizBanks: QuizBanksData
  posts: PostsData
  classrooms: ClassroomsData
  users: UsersData
}

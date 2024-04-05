import PagedRequest from "@/types/paged-request"

export interface Game {
  id: number
  gameName: string
  isTest: boolean
  classroomId: number
  quizBankId: number
  numberOfQuizzes: number
  status: string
  startTime: string
  endTime: string
  duration: number
  created: string
  updated: string
}

enum GameType {
  Dnd = "Dnd",
  ConstructedResponse = "ConstructedResponse",
  TrueFalse = "TrueFalse",
  MultipleChoice = "MultipleChoice",
}
interface AnswerHistoryResponse {
  isCorrect: boolean
  userAnswer: string[]
  quiz: GameQuiz
}
interface AnswerHistory {
  gameId: number
  quizId: number
  userAnswer: string[]
}

interface GetQuizzes {
  gameId: number
  options: PagedRequest
}
interface LeaveGame {
  gameId: number
}

export { GameType }
export type { AnswerHistory, AnswerHistoryResponse, GetQuizzes, LeaveGame }

export interface GameQuiz {
  id: number
  gameId: number
  game?: Game
  questions: string[]
  answers: string[]
  type: GameType
}

import { create } from "zustand"
import MOCK_DATA from "../DATA.json"
import { AnswerHistory, AnswerHistoryResponse, GameQuiz } from "@/types/game"

type GameState = {
  questions: GameQuiz[]
  currentIndex: number
  currentQuestion: GameQuiz | undefined
  isNextDisabled: boolean
  isPrevDisabled: boolean
  duration: number
  userAnswers: AnswerHistory[]
}
type GameAction = {
  addQuestions: (questions: GameQuiz[]) => void
  nextQuestion: () => void
  prevQuestion: () => void
  submitAnswer: (answer: AnswerHistoryResponse) => void
  updateDuration: (duration: number) => void
}

export default create<GameState & GameAction>((set, get) => ({
  questions: [],
  currentIndex: 0,
  duration: 60,
  currentQuestion: undefined,
  userAnswers: [],
  isNextDisabled: false,
  isPrevDisabled: true,
  updateDuration: (duration) => set((state) => ({ duration })),
  addQuestions: (questions) =>
    set((state) => ({ questions, currentQuestion: questions[0] })),
  nextQuestion: () =>
    set((state) => {
      const nextIndex = state.currentIndex + 1
      if (nextIndex < state.questions.length) {
        return {
          currentIndex: nextIndex,
          isNextDisabled: nextIndex === state.questions.length - 1,
          isPrevDisabled: false,
          currentQuestion: state.questions[nextIndex],
        }
      }
      return {
        ...state,
      }
    }),
  prevQuestion: () =>
    set((state) => {
      const prevIndex = state.currentIndex - 1
      if (prevIndex >= 0) {
        return {
          currentIndex: prevIndex,
          isNextDisabled: false,
          isPrevDisabled: prevIndex === 0,
          currentQuestion: state.questions[prevIndex],
        }
      }
      return {
        ...state,
      }
    }),
  submitAnswer: (answer) =>
    set((state) => ({ userAnswers: [...state.userAnswers, answer] })),
}))

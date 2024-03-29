import { create } from "zustand"
import MOCK_DATA from "../DATA.json"
export type GameQuestion = {
  type: "mcq" | "dnd" | "fib"
  id: number
  questions: string[]
  answers: string[]
}
export type UserGameAnswer = {
  questionId: number
  answer: string
}

type GameState = {
  questions: GameQuestion[]
  currentIndex: number
  currentQuestion: GameQuestion | undefined
  isNextDisabled: boolean
  isPrevDisabled: boolean
  duration: number
  userAnswers: UserGameAnswer[]
}
type GameAction = {
  addQuestions: (questions: GameQuestion[]) => void
  nextQuestion: () => void
  prevQuestion: () => void
  submitAnswer: (answer: UserGameAnswer) => void
  updateDuration: (duration: number) => void
}

export default create<GameState & GameAction>((set, get) => ({
  questions: MOCK_DATA as GameQuestion[],
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

"use client"
import DndQuestion from "@/app/[locale]/(fullscreen)/classrooms/[id]/game/[gameId]/components/drag-and-drop-question/DragContext"
import FillInQuestion from "@/app/[locale]/(fullscreen)/classrooms/[id]/game/[gameId]/components/fill-in-question"
import MultipleChoiceQuestion from "@/app/[locale]/(fullscreen)/classrooms/[id]/game/[gameId]/components/mcq-question"
import TrueFalseQuestion from "@/app/[locale]/(fullscreen)/classrooms/[id]/game/[gameId]/components/tf-question"
import useGame, {
  GameQuestion,
} from "@/app/[locale]/(fullscreen)/classrooms/[id]/game/[gameId]/components/useGame"
import { useGameSignal } from "@/app/[locale]/(fullscreen)/classrooms/[id]/game/[gameId]/components/useGameSignal"
import { Icons } from "@/components/ui/icons"
import { Game } from "@/types"
import { useCallback, useEffect, useState } from "react"
import Confetti from "react-confetti"

type PlayGameProps = {
  initData: Game
}

function PlayGame({ initData }: PlayGameProps) {
  const [conffeti, setConffeti] = useState(false)
  const { connectToGame, leave, start } = useGameSignal()

  useEffect(() => {
    start(() => {
      connectToGame(+initData.id)
    })
  }, [connectToGame, initData.id, start])
  const { questions, addQuestions, currentQuestion, duration, nextQuestion } =
    useGame()

  // useEffect(() => {
  //   if (!initData) return
  //   addQuestions(initData)
  // }, [addQuestions, initData])

  const renderQuestion = useCallback((question: GameQuestion) => {
    switch (question.type) {
      case "dnd":
        return <DndQuestion data={question} />
      case "mcq":
        return <MultipleChoiceQuestion data={question} onSubmit={() => {}} />
      case "fib":
        return <FillInQuestion data={question} onSubmit={() => {}} />
      default:
        return <TrueFalseQuestion data={question} onSubmit={() => {}} />
    }
  }, [])

  if (!currentQuestion) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Icons.Loader className="h-8 w-8 animate-spin" />
      </div>
    )
  }
  return (
    <div>
      {renderQuestion(currentQuestion)}
      {conffeti && <Confetti numberOfPieces={500} recycle={false} />}
    </div>
  )
}

export default PlayGame

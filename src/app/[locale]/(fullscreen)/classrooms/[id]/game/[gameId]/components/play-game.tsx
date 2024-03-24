"use client"
import DndQuestion from "@/app/[locale]/(fullscreen)/classrooms/[id]/game/[gameId]/components/drag-and-drop-question/DragContext"
import MultipleChoiceQuestion from "@/app/[locale]/(fullscreen)/classrooms/[id]/game/[gameId]/components/mcq-question"
import useGame, {
  Game,
} from "@/app/[locale]/(fullscreen)/classrooms/[id]/game/[gameId]/components/useGame"
import { Icons } from "@/components/ui/icons"
import { useCallback, useEffect, useRef, useState } from "react"
import Confetti from "react-confetti"

type PlayGameProps = {
  initData?: Game[]
}

function PlayGame({ initData }: PlayGameProps) {
  const [conffeti, setConffeti] = useState(false)
  const deplayTimeout = useRef<NodeJS.Timeout>()
  const { questions, addQuestions, currentQuestion, duration, nextQuestion } =
    useGame()

  useEffect(() => {
    if (!initData) return
    addQuestions(initData)
  }, [addQuestions, initData])
  const renderQuestion = useCallback((question: Game) => {
    switch (question.type) {
      case "dnd":
        return <DndQuestion data={question} />
      case "mcq":
        return <MultipleChoiceQuestion data={question} onSubmit={() => {}} />
    }
  }, [])

  useEffect(() => {
    if (duration === 0) {
      // setConffeti(true)
      // deplayTimeout.current = setTimeout(() => {
      //   nextQuestion()
      //   setConffeti(false)
      // }, 2000)
    }

    return () => {
      clearTimeout(deplayTimeout.current)
    }
  }, [duration, nextQuestion])
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

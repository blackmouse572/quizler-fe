"use client"
import DndQuestion from "@/app/[locale]/(fullscreen)/classrooms/[id]/game/[gameId]/components/drag-and-drop-question/DragContext"
import FillInQuestion from "@/app/[locale]/(fullscreen)/classrooms/[id]/game/[gameId]/components/fill-in-question"
import MultipleChoiceQuestion from "@/app/[locale]/(fullscreen)/classrooms/[id]/game/[gameId]/components/mcq-question"
import TrueFalseQuestion from "@/app/[locale]/(fullscreen)/classrooms/[id]/game/[gameId]/components/tf-question"
import useGame, {
  GameQuestion,
} from "@/app/[locale]/(fullscreen)/classrooms/[id]/game/[gameId]/components/useGame"
import { useGameSignal } from "@/app/[locale]/(fullscreen)/classrooms/[id]/game/[gameId]/components/useGameSignal"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import { Game } from "@/types"
import { useTranslations } from "next-intl"
import { useCallback, useEffect, useState } from "react"
import Confetti from "react-confetti"

type PlayGameProps = {
  initData: Game
}
const TAKE = 20
function PlayGame({ initData }: PlayGameProps) {
  const [conffeti, setConffeti] = useState(false)
  const [error, setError] = useState<string>()
  const errorI18n = useTranslations("Errors")
  const { connectToGame, leave, start, getQuizzes } = useGameSignal({
    gameId: Number.parseInt(initData.id),
  })
  const { questions, addQuestions, currentQuestion, duration, nextQuestion } =
    useGame()

  useEffect(() => {
    start(() => {
      connectToGame(+initData.id)
        ?.then(() => {
          getQuizzes({
            take: TAKE,
            skip: 0,
          })?.then((res) => {
            console.log("get quizzes", res)
            // addQuestions(res.data.items)
          })
        })
        .catch((e) => {
          setError(errorI18n("game.already-joined"))
        })
    })
  }, [addQuestions, connectToGame, errorI18n, getQuizzes, initData.id, start])

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
  if (error) {
    return (
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle>{errorI18n("index")}</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg text-danger-500">{error}</h3>
        </CardContent>
        <CardFooter>
          <Button>
            <Icons.Refresh className="mr-2 h-5 w-5" />
            {errorI18n("refresh")}
          </Button>
        </CardFooter>
      </Card>
    )
  }
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

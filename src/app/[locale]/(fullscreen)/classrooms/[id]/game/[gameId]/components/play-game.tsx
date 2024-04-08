"use client"
import DndQuestion from "@/app/[locale]/(fullscreen)/classrooms/[id]/game/[gameId]/components/drag-and-drop-question/DragContext"
import FillInQuestion from "@/app/[locale]/(fullscreen)/classrooms/[id]/game/[gameId]/components/fill-in-question"
import MultipleChoiceQuestion from "@/app/[locale]/(fullscreen)/classrooms/[id]/game/[gameId]/components/mcq-question"
import TrueFalseQuestion from "@/app/[locale]/(fullscreen)/classrooms/[id]/game/[gameId]/components/tf-question"
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
import { GameQuiz, GameType } from "@/types/game"
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
  const { connectToGame, leave, start, questions } = useGameSignal({
    gameId: Number.parseInt(initData.id),
  })

  useEffect(() => {
    start(() => {
      connectToGame(+initData.id)
        ?.then(() => {})
        .catch((e) => {
          setError(errorI18n("game.already-joined"))
        })
    })
  }, [connectToGame, errorI18n, initData.id, start])

  const renderQuestion = useCallback((question: GameQuiz) => {
    switch (question.type) {
      case GameType.Dnd:
        return <DndQuestion data={question} onSubmit={() => {}} />
      case GameType.MultipleChoice:
        return <MultipleChoiceQuestion data={question} onSubmit={() => {}} />
      case GameType.ConstructedResponse:
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
  if (!questions) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Icons.Loader className="h-8 w-8 animate-spin" />
      </div>
    )
  }
  return (
    <div>
      {renderQuestion(questions)}
      {conffeti && <Confetti numberOfPieces={500} recycle={false} />}
    </div>
  )
}

export default PlayGame

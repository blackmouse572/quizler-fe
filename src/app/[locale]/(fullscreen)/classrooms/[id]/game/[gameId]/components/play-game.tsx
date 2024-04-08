"use client"
import DndQuestion from "@/app/[locale]/(fullscreen)/classrooms/[id]/game/[gameId]/components/drag-and-drop-question/DragContext"
import FillInQuestion from "@/app/[locale]/(fullscreen)/classrooms/[id]/game/[gameId]/components/fill-in-question"
import MultipleChoiceQuestion from "@/app/[locale]/(fullscreen)/classrooms/[id]/game/[gameId]/components/mcq-question"
import TrueFalseQuestion from "@/app/[locale]/(fullscreen)/classrooms/[id]/game/[gameId]/components/tf-question"
import { useGameSignal } from "@/app/[locale]/(fullscreen)/classrooms/[id]/game/[gameId]/components/useGameSignal"
import { useProgress } from "@/app/[locale]/(fullscreen)/classrooms/[id]/game/[gameId]/components/useProgress"
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
import {
  AnswerHistory,
  AnswerHistoryResponse,
  GameQuiz,
  GameType,
} from "@/types/game"
import { useTranslations } from "next-intl"
import { useCallback, useEffect, useRef, useState } from "react"
import Confetti from "react-confetti"

type PlayGameProps = {
  initData: Game
}
const TAKE = 20
function PlayGame({ initData }: PlayGameProps) {
  const [answer, setAnswer] = useState<AnswerHistory>({
    gameId: Number.parseInt(initData.id),
    quizId: 0,
    userAnswer: [],
  })
  const [conffeti, setConffeti] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isWrong, setIsWrong] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string>()
  const errorI18n = useTranslations("Errors")
  const { current, reduce } = useProgress()

  const timeInterval = useRef<NodeJS.Timeout>()

  const handleResult = useCallback(
    (result: AnswerHistoryResponse, cb: () => void) => {
      setIsLoading(false)
      setIsSubmitted(false)
      if (result.isCorrect) {
        setConffeti(true)
      } else {
        setIsWrong(true)
      }
      // next question in 2 seconds
      setTimeout(() => {
        cb()
        setIsWrong(false)
      }, 2000)
    },
    []
  )

  const { connectToGame, leave, start, questions, submitAnswer } =
    useGameSignal({
      gameId: Number.parseInt(initData.id),
      onReceiveAnswer: handleResult,
    })

  useEffect(() => {
    timeInterval.current = setInterval(() => {
      if (current <= 0 || !questions || isSubmitted || isLoading) return
      reduce()
    }, 1000)

    return () => {
      clearInterval(timeInterval.current)
    }
  }, [current, isLoading, isSubmitted, questions, reduce])

  const handleSubmitted = useCallback(() => {
    setIsSubmitted(true)
    submitAnswer(answer)
  }, [answer, submitAnswer])
  useEffect(() => console.log(answer), [answer])

  useEffect(() => {
    if (questions) {
      setAnswer((prev) => ({ ...prev, quizId: questions.id }))
    }
  }, [questions])

  useEffect(() => {
    if (current === 0) {
      handleSubmitted()
    }
  }, [answer, current, handleSubmitted, submitAnswer])

  useEffect(() => {
    start(() => {
      connectToGame(+initData.id)
        ?.then(() => {})
        .catch((e) => {
          setError(errorI18n("game.already-joined"))
        })
    })
  }, [connectToGame, errorI18n, initData.id, start])

  const renderQuestion = useCallback(
    (question: GameQuiz) => {
      switch (question.type) {
        case GameType.Dnd:
          return (
            <DndQuestion
              data={question}
              isWrong={isWrong}
              disabled={isSubmitted}
              onSubmit={(answer) => {
                setAnswer((prev) => ({
                  ...prev,
                  userAnswer: answer,
                }))
              }}
            />
          )
        case GameType.MultipleChoice:
          return (
            <MultipleChoiceQuestion
              isWrong={isWrong}
              data={question}
              onSubmit={(answer) => {
                setAnswer((prev) => ({
                  ...prev,
                  userAnswer: [answer],
                }))
              }}
              disabled={isSubmitted}
            />
          )
        case GameType.ConstructedResponse:
          return (
            <FillInQuestion
              isWrong={isWrong}
              data={question}
              disabled={isSubmitted}
              onSubmit={(answerr) => {
                setAnswer((prev) => ({
                  ...prev,
                  userAnswer: [answerr],
                }))
              }}
            />
          )
        default:
          return (
            <TrueFalseQuestion
              isWrong={isWrong}
              data={question}
              disabled={isSubmitted}
              onSubmit={(answer) => {
                setAnswer((prev) => ({
                  ...prev,
                  userAnswer: [answer ? "True" : "False"],
                }))
              }}
            />
          )
      }
    },
    [isSubmitted, isWrong]
  )

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
  if (!questions || isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Icons.Loader className="h-8 w-8 animate-spin" />
      </div>
    )
  }
  return (
    <div>
      {renderQuestion(questions)}
      {conffeti && (
        <Confetti
          numberOfPieces={500}
          recycle={false}
          onConfettiComplete={() => setConffeti(false)}
        />
      )}
    </div>
  )
}

export default PlayGame

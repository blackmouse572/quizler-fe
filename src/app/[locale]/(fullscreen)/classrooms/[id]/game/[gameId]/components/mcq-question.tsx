import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { GameQuiz } from "@/types/game"
import { useCallback, useMemo, useState } from "react"

type Props = {
  data: GameQuiz
  onSubmit: (answer: string) => void
  disabled: boolean
  isWrong: boolean
}
function MultipleChoiceQuestion({
  data,
  disabled,
  onSubmit,
  isWrong = false,
}: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>()
  const selectecAnswer = useCallback(
    (answer: string) => {
      if (disabled) return
      setSelectedAnswer(answer)
      onSubmit(answer)
      return
    },
    [disabled, onSubmit]
  )
  const renderQuestion = useMemo(() => {
    return (
      <div className="text-center text-4xl font-bold">{data.questions[0]}</div>
    )
  }, [data.questions])
  const renderAnswers = useMemo(() => {
    return data.answers.map((answer, index) => {
      return (
        <Card
          key={answer}
          className={cn(
            "min-h-32 cursor-pointer transition-all hover:bg-muted active:bg-accent",
            {
              "border-red-500 bg-red-200 hover:bg-red-300":
                isWrong && selectedAnswer === answer,
              "border border-emerald-500": selectedAnswer === answer,
            }
          )}
          onClick={() => selectecAnswer(answer)}
        >
          <CardContent className="flex h-full w-full items-center justify-center text-center text-lg font-medium">
            {answer}
          </CardContent>
        </Card>
      )
    })
  }, [data.answers, isWrong, selectecAnswer, selectedAnswer])

  return (
    <>
      {renderQuestion}
      <div className="mt-16 grid grid-cols-2 gap-4">{renderAnswers}</div>
    </>
  )
}

export default MultipleChoiceQuestion

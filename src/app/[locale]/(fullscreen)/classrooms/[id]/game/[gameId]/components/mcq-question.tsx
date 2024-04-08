import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { GameQuiz } from "@/types/game"
import { useCallback, useMemo, useState } from "react"

type Props = {
  data: GameQuiz
  onSubmit: (answer: string) => void
}
function MultipleChoiceQuestion({ data }: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>()
  const selectecAnswer = useCallback(
    (answer: string) => {
      if (!selectedAnswer) {
        setSelectedAnswer(answer)
        return
      }
    },
    [selectedAnswer]
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
          className={cn(
            "min-h-32 cursor-pointer transition-all hover:bg-muted active:bg-accent",
            selectedAnswer === answer && "border border-emerald-500"
          )}
          onClick={() => selectecAnswer(answer)}
        >
          <CardContent className="flex h-full w-full items-center justify-center text-center text-lg font-medium">
            {answer}
          </CardContent>
        </Card>
      )
    })
  }, [data.answers, selectecAnswer, selectedAnswer])

  return (
    <>
      {renderQuestion}
      <div className="mt-16 grid grid-cols-2 gap-4">{renderAnswers}</div>
    </>
  )
}

export default MultipleChoiceQuestion

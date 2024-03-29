import { GameQuestion } from "@/app/[locale]/(fullscreen)/classrooms/[id]/game/[gameId]/components/useGame"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useCallback, useMemo, useState } from "react"

type Props = {
  data: GameQuestion
  onSubmit: (answer: string) => void
}
function MultipleChoiceQuestion({ data }: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>()
  const selecteAnswer = useCallback(
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
          onClick={() => selecteAnswer(answer)}
        >
          <CardContent className="flex h-full w-full items-center justify-center text-center text-lg font-medium">
            {answer}
          </CardContent>
        </Card>
      )
    })
  }, [data.answers, selecteAnswer, selectedAnswer])
  return (
    <>
      {renderQuestion}
      <div className="mt-16 grid grid-cols-2 gap-4">{renderAnswers}</div>
    </>
  )
}

export default MultipleChoiceQuestion

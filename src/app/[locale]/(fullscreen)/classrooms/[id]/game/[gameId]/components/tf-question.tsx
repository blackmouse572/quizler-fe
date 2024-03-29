import { GameQuestion } from "@/app/[locale]/(fullscreen)/classrooms/[id]/game/[gameId]/components/useGame"
import { Card, CardContent } from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import { cn } from "@/lib/utils"
import { useCallback, useMemo, useState } from "react"

type Props = {
  data: GameQuestion
  onSubmit: (answer: boolean) => void
}
function TrueFalseQuestion({ data, onSubmit }: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<boolean>()
  const submitAnswer = useCallback(
    (answer: boolean) => {
      setSelectedAnswer(answer)
      onSubmit
    },
    [onSubmit]
  )
  const renderQuestion = useMemo(() => {
    return (
      <div className="text-center text-4xl font-bold">{data.questions[0]}</div>
    )
  }, [data.questions])
  const renderAnswers = useMemo(() => {
    return (
      <>
        <Card
          className={cn(
            "min-h-32 cursor-pointer transition-all hover:bg-muted active:bg-accent",
            selectedAnswer === true && "border border-emerald-500"
          )}
          onClick={() => submitAnswer(true)}
        >
          <CardContent className="flex h-full w-full items-center justify-center text-center text-lg font-medium">
            <Icons.Checked className="h-12 w-12 text-success-500" />
          </CardContent>
        </Card>
        <Card
          className={cn(
            "min-h-32 cursor-pointer transition-all hover:bg-muted active:bg-accent",
            selectedAnswer === false && "border border-emerald-500"
          )}
          onClick={() => submitAnswer(false)}
        >
          <CardContent className="flex h-full w-full items-center justify-center text-center text-lg font-medium">
            <Icons.X className="h-12 w-12 text-danger-500" />
          </CardContent>
        </Card>
      </>
    )
  }, [submitAnswer, selectedAnswer])
  return (
    <>
      {renderQuestion}
      <div className="mt-16 grid grid-cols-2 gap-4">{renderAnswers}</div>
    </>
  )
}

export default TrueFalseQuestion

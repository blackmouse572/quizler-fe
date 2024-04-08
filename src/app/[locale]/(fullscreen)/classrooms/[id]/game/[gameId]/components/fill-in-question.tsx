import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { GameQuiz } from "@/types/game"
import { useCallback } from "react"

type Props = {
  data: GameQuiz
  disabled?: boolean
  onSubmit: (answer: string) => void
  isWrong: boolean
}
function FillInQuestion({ data, onSubmit, disabled, isWrong = false }: Props) {
  const submitAnswer = useCallback(
    (answer: string) => {
      onSubmit(answer)
    },
    [onSubmit]
  )

  return (
    <Card>
      <CardHeader />
      <CardContent className="min-h-36">
        <CardTitle className="text-center text-4xl">
          {data.questions[0]}
        </CardTitle>
      </CardContent>
      <CardFooter>
        <Input
          className={cn(
            "h-12 w-full",
            isWrong ? "border-red-500 bg-red-200" : ""
          )}
          onChange={(e) => {
            if (disabled) return
            return submitAnswer(e.target.value)
          }}
        />
      </CardFooter>
    </Card>
  )
}

export default FillInQuestion

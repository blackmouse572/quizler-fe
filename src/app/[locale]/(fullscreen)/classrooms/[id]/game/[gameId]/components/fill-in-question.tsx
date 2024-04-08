import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { GameQuiz } from "@/types/game"
import { useCallback } from "react"

type Props = {
  data: GameQuiz
  onSubmit: (answer: string) => void
}
function FillInQuestion({ data, onSubmit }: Props) {
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
          className="h-12 w-full"
          onChange={(e) => submitAnswer(e.target.value)}
        />
      </CardFooter>
    </Card>
  )
}

export default FillInQuestion

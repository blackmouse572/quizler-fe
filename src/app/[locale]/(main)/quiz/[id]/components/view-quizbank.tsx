// view quizbank bao gom view-flashcard + view-quizzes
// moi view-quizzes la 1 quiz tu quizbank

import QuizBank from "@/types/QuizBank"
import ViewFlashcard from "./view-flashcard"
import ViewQuizzes from "./view-quizzes"
import RecommendQuizBank from "./recommend-quizbank"

type Props = {
  data: QuizBank
}

function ViewQuizBank({ data }: Props) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-solid">
      <ViewFlashcard data={data} />
      <ViewQuizzes data={data} />
      <RecommendQuizBank data={data} />
    </div>
  )
}

export default ViewQuizBank

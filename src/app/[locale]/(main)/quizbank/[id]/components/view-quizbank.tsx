// view quizbank bao gom view-flashcard + view-quizzes
// moi view-quizzes la 1 quiz tu quizbank

import QuizBank from "@/types/QuizBank"
import ViewFlashcard from "./view-flashcard"
import ViewQuizzes from "./view-quizzes"
import RecommendQuizBank from "./recommend-quizbank"

type Props = {
  quizBankData: QuizBank
  quizData: {}
}

function ViewQuizBank({ quizBankData, quizData }: Props) {
  // console.log("aaa: " + JSON.stringify(quizBankData))
  // console.log("bbb: " + JSON.stringify(quizData))
  return (
    <div className="flex flex-col items-center rounded-3xl border border-solid">
      <ViewFlashcard quizBankData={quizBankData} quizData={quizData} />
      <ViewQuizzes quizData={quizData} />
      <RecommendQuizBank quizBankData={quizBankData} />
    </div>
  )
}

export default ViewQuizBank

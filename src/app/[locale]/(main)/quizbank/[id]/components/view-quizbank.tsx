import QuizBank from "@/types/QuizBank"
import ViewFlashcard from "./view-flashcard"
import ViewQuizzes from "./view-quizzes"
import RecommendQuizBank from "./recommend-quizbank"
import AuthorQuizBank from "./author-quizbank"

type Props = {
  quizBankData: QuizBank,
  quizData: {},
  classname?: string
}

function ViewQuizBank({ quizBankData, quizData, classname }: Props) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-solid">
      <ViewFlashcard quizBankData={quizBankData} quizData={quizData} />
      <ViewQuizzes quizData={quizData} />
      <RecommendQuizBank quizBankData={quizBankData} />
      <AuthorQuizBank authorData={quizBankData.author} classname={classname} />
    </div>
  )
}

export default ViewQuizBank

import QuizBank from "@/types/QuizBank"
import ViewFlashcard from "./view-flashcard"
import ViewQuizzes from "./view-quizzes"
import RecommendQuizBank from "./recommend-quizbank"
import AuthorQuizBank from "./author-quizbank"

type Props = {
  quizBankData: QuizBank,
  flashcardData: any,
  quizData: any,
  classname?: string
}

function ViewQuizBank({ quizBankData, flashcardData, quizData, classname }: Props) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-solid">
      <ViewFlashcard quizBankData={quizBankData} flashcardData={flashcardData.data} />
      <ViewQuizzes quizData={quizData.data} />
      <RecommendQuizBank quizBankData={quizBankData} />
      <AuthorQuizBank authorData={quizBankData.author} classname={classname} />
    </div>
  )
}

export default ViewQuizBank

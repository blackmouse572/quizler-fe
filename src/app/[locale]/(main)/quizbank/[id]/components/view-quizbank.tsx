import QuizBank from "@/types/QuizBank"
import ViewFlashcard from "./view-flashcard"
import ViewQuizzes from "./view-quizzes"
import AuthorQuizBank from "./author-quizbank"
import ViewRelativeQuizBank from "./view-relative-quizbank"

type Props = {
  id: string,
  token: string,
  quizBankData: QuizBank,
  flashcardData: any,
  quizData: any,
  relativeQuizBankData: any,
  classname?: string
}

function ViewQuizBank({ id, token, quizBankData, flashcardData, quizData, relativeQuizBankData, classname }: Props) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-solid">
      <ViewFlashcard quizBankData={quizBankData} flashcardData={flashcardData} />
      <ViewQuizzes id={id} token={token} quizData={quizData} />
      <ViewRelativeQuizBank relativeQuizBankData={relativeQuizBankData} />
      <AuthorQuizBank authorData={quizBankData.author} classname={classname} />
    </div>
  )
}

export default ViewQuizBank

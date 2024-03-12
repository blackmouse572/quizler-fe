import QuizBank, { Quiz } from "@/types/QuizBank"
import PagedResponse from "@/types/paged-response"
import AuthorQuizBank from "./author-quizbank"
import ViewFlashcard from "./view-flashcard"
import ViewQuizzes from "./view-quizzes"
import ViewRelativeQuizBank from "./view-relative-quizbank"

type Props = {
  id: string
  token: string
  quizBankData: QuizBank
  flashcardData: any
  quizData: PagedResponse<Quiz>
  relativeQuizBankData: QuizBank[]
  classname?: string
}

function ViewQuizBank({
  id,
  token,
  quizBankData,
  flashcardData,
  quizData,
  relativeQuizBankData,
  classname,
}: Props) {
  return (
    <div className="container mx-auto mb-8 space-y-8">
      <ViewFlashcard
        id={id}
        token={token}
        quizBankData={quizBankData}
        flashcardData={flashcardData}
      />
      <ViewQuizzes id={id} token={token} quizData={quizData} />
      <ViewRelativeQuizBank relativeQuizBankData={relativeQuizBankData} />
      <AuthorQuizBank
        quizbankId={id}
        authorData={quizBankData.author}
        classname={classname}
      />
    </div>
  )
}

export default ViewQuizBank

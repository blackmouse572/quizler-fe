import ViewWrapper from "@/app/[locale]/(main)/quizbank/[id]/components/view-wrapper"
import QuizBank, { Quiz } from "@/types/QuizBank"
import PagedResponse from "@/types/paged-response"
import AuthorQuizBank from "./author-quizbank"
import ViewRelativeQuizBank from "./view-relative-quizbank"

type Props = {
  id: string
  quizBankData: QuizBank
  quizData: PagedResponse<Quiz>
  relativeQuizBankData: QuizBank[]
  classname?: string
  isOwnQuizBank?: boolean
  numberOfQuiz: number
}

function ViewQuizBank({
  id,
  quizBankData,
  quizData,
  relativeQuizBankData,
  classname,
  isOwnQuizBank,
  numberOfQuiz
}: Props) {
  return (
    <div className="container mx-auto mb-8 space-y-8">
      <ViewWrapper id={id} initialData={quizData} quizBankData={quizBankData} />
      <ViewRelativeQuizBank relativeQuizBankData={relativeQuizBankData} />
      <AuthorQuizBank
        quizbankId={id}
        authorData={quizBankData.author}
        classname={classname}
        isOwnQuizBank={isOwnQuizBank}
        quizBankVisibility={quizBankData.visibility}
        numberOfQuiz={numberOfQuiz}
      />
    </div>
  )
}

export default ViewQuizBank

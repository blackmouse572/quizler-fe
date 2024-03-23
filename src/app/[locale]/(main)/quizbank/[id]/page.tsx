import { getUser } from "@/lib/auth"
import QuizBank from "@/types/QuizBank"
import _ from "lodash"
import { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import { fetchQuiz } from "./actions/fetch-quiz"
import { fetchQuizBank } from "./actions/fetch-quiz-bank"
import { fetchRelativeQuiz } from "./actions/fetch-relative-quiz"
import ViewQuizBank from "./components/view-quizbank"

type QuizBankDetailPageProps = { params: { id: string } }

export async function generateMetadata({
  params,
}: QuizBankDetailPageProps): Promise<Metadata> {
  const { id } = params

  const { quizBankData } = await getQuizBankDetailPage(id)

  return {
    title: quizBankData.bankName,
    description: quizBankData.description,
  }
}

async function getQuizBankDetailPage(id: string) {
  const [quizBankRes, quizRes, relativeQuizRes] = await Promise.all([
    fetchQuizBank(id),
    fetchQuiz(id, {
      take: 10,
      skip: 0,
      sortBy: "created",
    }),
    fetchRelativeQuiz(id),
  ])

  const quizBankData = (await quizBankRes.json()) as QuizBank

  const quizData = {
    data: quizRes,
  }
  const relativeQuizBankData: QuizBank[] = await relativeQuizRes.json()

  return { quizBankData, quizData, relativeQuizBankData }
}

async function QuizBankDetailPage({ params }: QuizBankDetailPageProps) {
  const message = await getMessages()
  const { id } = params

  const { quizBankData, quizData, relativeQuizBankData } =
    await getQuizBankDetailPage(id)

  const isUserOwnQuizBank = quizBankData.author.id === getUser()?.id

  if (!quizData.data.data) {
    return notFound()
  }

  return (
    <NextIntlClientProvider
      messages={_.pick(message, "ViewQuizBank", "CopyQuizBank", "ReportQuizBank", "Validations", "Errors", "Change_quizbank_visibility")}
    >
      <ViewQuizBank
        id={id}
        quizBankData={quizBankData}
        quizData={quizData.data.data}
        relativeQuizBankData={relativeQuizBankData.filter(
          (item) => item.id !== quizBankData.id
        )}
        isOwnQuizBank={isUserOwnQuizBank}
      />
    </NextIntlClientProvider>
  )
}

export default QuizBankDetailPage

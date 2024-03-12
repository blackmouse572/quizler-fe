import QuizBank from "@/types/QuizBank"
import { Metadata } from "next"
import ViewQuizBank from "./components/view-quizbank"
import { NextIntlClientProvider } from "next-intl"
import _ from "lodash"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import { fetchQuizBank } from "./actions/fetch-quiz-bank"
import { fetchFlashcard } from "./actions/fetch-flashcard"
import { fetchQuiz } from "./actions/fetch-quiz"
import { fetchRelativeQuiz } from "./actions/fetch-relative-quiz"
import { getToken } from "@/lib/auth"

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
  const token = getToken().token

  const [quizBankRes, flashcardRes, quizRes, relativeQuizRes] =
    await Promise.all([
      fetchQuizBank(id),
      fetchFlashcard(id, token, 0),
      fetchQuiz(id, token, 0),
      fetchRelativeQuiz(id),
    ])

  const quizBankData = (await quizBankRes.json()) as QuizBank
  const flashcardData = {
    statusCode: flashcardRes.status,
    data: await flashcardRes.json(),
  }
  const quizData = {
    statusCode: quizRes.status,
    data: await quizRes.json(),
  }
  const relativeQuizBankData = await relativeQuizRes.json()

  return { quizBankData, flashcardData, quizData, relativeQuizBankData }
}

async function QuizBankDetailPage({ params }: QuizBankDetailPageProps) {
  const message = await getMessages()
  const { id } = params

  const { quizBankData, flashcardData, quizData, relativeQuizBankData } =
    await getQuizBankDetailPage(id)

  const token = getToken().token
  {
    flashcardData.statusCode !== 200 &&
      quizData.statusCode !== 200 &&
      notFound()
  }

  return (
    <NextIntlClientProvider
      messages={_.pick(message, "ViewQuizBank", "CopyQuizBank", "Errors")}
    >
      <ViewQuizBank
        id={id}
        token={token}
        quizBankData={quizBankData}
        flashcardData={flashcardData.data}
        quizData={quizData.data}
        relativeQuizBankData={relativeQuizBankData}
      />
    </NextIntlClientProvider>
  )
}

export default QuizBankDetailPage

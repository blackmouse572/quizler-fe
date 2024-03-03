import { getAPIServerURL } from "@/lib/utils"
import QuizBank from "@/types/QuizBank"
import { Metadata } from "next"
import ViewQuizBank from "./components/view-quizbank"
import { NextIntlClientProvider } from "next-intl"
import _ from "lodash"
import { getMessages } from "next-intl/server"
import { getToken } from "@/lib/auth"
import { notFound } from "next/navigation"

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
  const quizBankUrl = getAPIServerURL(`/quizbank/${id}`)
  const flashcardUrl = getAPIServerURL(`/quiz/${id}`)
  const quizUrl = getAPIServerURL(`/quiz/${id}?take=1`)

  const token = getToken().token

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }

  const [quizBankRes, flashcardRes, quizRes] = await Promise.all([
    fetch(quizBankUrl, options),
    fetch(flashcardUrl, options),
    fetch(quizUrl, options),
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

  return { quizBankData, flashcardData, quizData }
}

async function QuizBankDetailPage({ params }: QuizBankDetailPageProps) {
  const message = await getMessages()
  const { id } = params

  const { quizBankData, flashcardData, quizData } =
    await getQuizBankDetailPage(id)

  // if quizbank is private or user is not author => return notFound
  {
    flashcardData.statusCode !== 200 &&
      quizData.statusCode !== 200 &&
      notFound()
  }

  return (
    <NextIntlClientProvider messages={_.pick(message, "ViewQuizBank")}>
      <ViewQuizBank
        quizBankData={quizBankData}
        flashcardData={flashcardData.data}
        quizData={quizData.data}
      />
    </NextIntlClientProvider>
  )
}

export default QuizBankDetailPage

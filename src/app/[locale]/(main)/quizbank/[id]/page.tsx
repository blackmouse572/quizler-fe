import { getAPIServerURL } from "@/lib/utils"
import QuizBank from "@/types/QuizBank"
import { Metadata } from "next"
import ViewQuizBank from "./components/view-quizbank"
import { NextIntlClientProvider } from "next-intl"
import _ from "lodash"
import { getMessages } from "next-intl/server"

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
  const quizUrl = getAPIServerURL(`/quiz/${id}`)

  const [quizBankRes, quizRes] = await Promise.all([
    fetch(quizBankUrl),
    fetch(quizUrl)
  ]);

  const quizBankData = (await quizBankRes.json()) as QuizBank
  const quizData = await quizRes.json()

  return { quizBankData, quizData }
}

async function QuizBankDetailPage({ params }: QuizBankDetailPageProps) {
  const message = await getMessages()
  const { id } = params

  const { quizBankData, quizData } = await getQuizBankDetailPage(id)

  return (
    <NextIntlClientProvider messages={_.pick(message, "ViewQuizBank")}>
      <ViewQuizBank quizBankData={quizBankData} quizData={quizData} />
    </NextIntlClientProvider>
  )
}

export default QuizBankDetailPage

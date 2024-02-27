import { getAPIServerURL } from "@/lib/utils"
import QuizBank from "@/types/QuizBank"
import { Metadata } from "next"
import ViewQuizBank from "./components/view-quizbank"
import { NextIntlClientProvider, useMessages } from "next-intl"
import _ from "lodash"
import { getMessages } from "next-intl/server"

type QuizBankDetailPageProps = { params: { id: string } }

export async function generateMetadata({
  params,
}: QuizBankDetailPageProps): Promise<Metadata> {
  const { id } = params

  const { props } = await getQuizBankDetailPage(id)

  return {
    title: props.data.bankName,
    description: props.data.description,
  }
}

async function getQuizBankDetailPage(id: string) {
  const url = getAPIServerURL(`/quizbank/${id}`)
  const res = await fetch(url)
  const data = (await res.json()) as QuizBank
  return {
    props: {
      data,
    },
  }
}

async function QuizBankDetailPageTemporary({
  params,
}: QuizBankDetailPageProps) {
  const { id } = params

  const { props } = await getQuizBankDetailPage(id)

  return <QuizBankDetailPage data={props.data} />
}

function QuizBankDetailPage({ data }: any) {
  const message = useMessages()

  return (
    <NextIntlClientProvider
      messages={_.pick(message, "ViewQuizBank")}
    >
      <ViewQuizBank data={data} />
    </NextIntlClientProvider>
  )
}

export default QuizBankDetailPage

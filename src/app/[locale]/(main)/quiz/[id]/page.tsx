import { getQuizBankDetailPage } from "@/services/quiz.service"
import { Metadata } from "next"

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

async function QuizBankDetailPage({ params }: QuizBankDetailPageProps) {
  const { id } = params

  const { props } = await getQuizBankDetailPage(id)
  return <div>{JSON.stringify(props.data)}</div>
}

export default QuizBankDetailPage

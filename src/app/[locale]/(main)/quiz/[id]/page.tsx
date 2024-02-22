import { getAPIServerURL } from "@/lib/utils"
import QuizBank from "@/types/QuizBank"
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
async function QuizBankDetailPage({ params }: QuizBankDetailPageProps) {
  const { id } = params

  const { props } = await getQuizBankDetailPage(id)
  return <div>{JSON.stringify(props.data)}</div>
}

export default QuizBankDetailPage

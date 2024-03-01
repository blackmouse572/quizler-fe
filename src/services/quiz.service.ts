import { getAPIServerURL } from "@/lib/utils"
import QuizBank from "@/types/QuizBank"

export async function getQuizBankDetailPage(id: string) {
    const url = getAPIServerURL(`/quizbank/${id}`)
    const res = await fetch(url)
    const data = (await res.json()) as QuizBank
    return {
      props: {
        data,
      },
    }
  }

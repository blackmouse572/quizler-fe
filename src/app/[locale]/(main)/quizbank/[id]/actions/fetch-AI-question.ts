"use server"
import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { AIAnswer } from "@/types"

type Props = {
  question: string
  answer: string
  explaination?: string
}

export const fetchAIquestion = async ({
  question,
  answer,
  explaination,
}: Props) => {
  const token = getToken().token
  const url = getAPIServerURL(`/quiz/text-only-input`)

  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ question, answer, explaination }),
  }

  const res = await fetch(url, option)
    .then(async (res) => {
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message)
      }
      return data
    })
    .then((res: AIAnswer) => {
      return {
        ok: true,
        message: "success",
        data: res,
      }
    })
    .catch((err) => {
      console.error(`[ERROR] getUserProfile: `, err.message)
      return {
        ok: false,
        message: err.message,
        data: null,
      }
    })

  return res
}

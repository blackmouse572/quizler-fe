"use server"
import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"

export const fetchAIquestion = async (
  question: string,
  answer: string,
  explaination?: string
) => {
  const token = getToken().token
  const URL = getAPIServerURL(`/quiz/text-only-input`)

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ question, answer, explaination }),
  }

  const res = await fetch(URL, options).then(async (response) => {
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    }
    return response.json()
  })

  return res
}

import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"

export const fetchQuizBank = async (id: string) => {
  const URL = getAPIServerURL(`/quizbank/${id}`)
  const token = getToken().token

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }

  const res = await fetch(URL, options).then(async (response) => {
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    }
    return response
  })

  return res
}

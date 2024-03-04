import { getAPIServerURL } from "@/lib/utils"

export const fetchFlashcard = async (id: string, token: string, skip: number) => {
  const URL = getAPIServerURL(`/quiz/${id}`)

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

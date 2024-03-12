import { getAPIServerURL } from "@/lib/utils"
import { Quiz } from "@/types"
import PagedResponse from "@/types/paged-response"

export const fetchQuiz = async (id: string, token: string, skip: number) => {
  const url = getAPIServerURL(`/quiz/${id}?skip=${skip}`)

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }

  return fetch(url, options)
    .then(async (res) => {
      const json = await res.json()
      if (!res.ok) {
        throw new Error(json)
      }
      return json
    })
    .then((res: PagedResponse<Quiz>) => {
      return {
        ok: true,
        message: "success",
        data: res,
      }
    })
    .catch((error) => {
      return {
        ok: false,
        message: error.message,
        data: null,
      }
    })
}

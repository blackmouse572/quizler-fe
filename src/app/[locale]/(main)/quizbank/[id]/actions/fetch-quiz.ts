import { getAPIServerURL } from "@/lib/utils"
import { Quiz } from "@/types"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"

export const fetchQuiz = async (
  id: string,
  token: string,
  option: Partial<PagedRequest>
) => {
  const { skip, search, sortBy, sortDirection, take } = option
  const query = new URLSearchParams({
    skip: skip?.toString() ?? "0",
    take: take?.toString() ?? "10",
    sortBy: sortBy ?? "createdAt",
  })
  const url = getAPIServerURL(`/quiz/${id}?${query.toString()}`)

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

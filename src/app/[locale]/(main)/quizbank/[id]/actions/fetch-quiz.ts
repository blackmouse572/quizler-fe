"use server"

import { getToken } from "@/lib/auth"
import { toURLSeachParams } from "@/lib/query"
import { getAPIServerURL } from "@/lib/utils"
import { Quiz } from "@/types"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"

export const fetchQuiz = async (id: string, option: Partial<PagedRequest>) => {
  const token = getToken().token
  const { skip, sortBy, sortDirection, take } = option
  const query = toURLSeachParams({
    skip: skip?.toString() ?? "0",
    take: take?.toString() ?? "10",
    sortBy: sortBy,
    sortDirection: sortDirection,
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

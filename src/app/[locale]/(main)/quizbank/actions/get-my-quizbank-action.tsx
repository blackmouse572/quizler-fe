"use server"

import { getToken } from "@/lib/auth"
import { toURLSeachParams } from "@/lib/query"
import { getAPIServerURL } from "@/lib/utils"
import QuizBank from "@/types/QuizBank"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"

export async function getMyQuizbankAction(options: Partial<PagedRequest>) {
  //Convert object to query string
  const { token } = getToken()
  const query = toURLSeachParams({
    ...options,
    search:
      options.search && options.search.length > 0 ? options.search : undefined,
  })
  const option: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: {
      revalidate: 1, // Revalidate every 1 second
    },
  }
  const url = getAPIServerURL(`/QuizBank/GetMyQuizBank?${query.toString()}`)
  return fetch(url, option)
    .then(async (res) => {
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message)
      }
      return data
    })
    .then((res: PagedResponse<QuizBank>) => ({
      ok: true,
      message: "success",
      data: res,
    }))
    .catch((err) => {
      return {
        ok: false,
        message: err.message,
        data: null,
      }
    })
}

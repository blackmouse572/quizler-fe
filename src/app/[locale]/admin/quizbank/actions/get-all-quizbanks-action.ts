"use server"

import { getToken } from "@/lib/auth"
import { toURLSeachParams } from "@/lib/query"
import { getAPIServerURL } from "@/lib/utils"
import QuizBank from "@/types/QuizBank"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"

type Props = {
  filter: Partial<PagedRequest>
}

export default async function getAllQuizBanksAction({ filter }: Props) {
  const token = getToken().token
  const query = toURLSeachParams({
    ...filter,
    sortBy: "created",
    sortDirection: "DESC",
  })
  const option: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["AdminQuizBank"],
      revalidate: 60, // Revalidate every 60 second
    },
  }
  const url = getAPIServerURL("/QuizBank") + "?" + query

  const res = await fetch(url, option)
    .then(async (res) => {
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message)
      }
      return data
    })
    .then((res: PagedResponse<QuizBank>) => {
      return {
        ok: true,
        message: "success",
        data: res,
      }
    })
    .catch((err) => {
      console.error(`[ERROR] getAllQuizBanksAction: `, err.message)
      return {
        ok: false,
        message: err.message,
        data: null,
      }
    })
  return res
}

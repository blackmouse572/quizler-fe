"use server"

import { TAPIResult } from "@/app/[locale]/(main)/quizbank/add/actions/add-quiz-bank-classroom-action"
import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { User } from "@/types"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"

export default async function getUsersAction(
  req: Partial<PagedRequest>
): Promise<TAPIResult<PagedResponse<User>>> {
  const url = getAPIServerURL("/accounts")
  const { token } = getToken()

  const option: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }

  return fetch(url, option)
    .then(async (res) => {
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message)
      }
      return data
    })
    .then((res: PagedResponse<User>) => ({
      ok: true,
      message: "success",
      data: res,
    }))
    .catch((err) => {
      return {
        ok: false,
        message: err.message,
        data: undefined,
      }
    })
}

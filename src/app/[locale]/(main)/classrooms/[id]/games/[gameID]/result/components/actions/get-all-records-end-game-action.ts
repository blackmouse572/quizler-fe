"use server"

import { getToken } from "@/lib/auth"
import { toURLSeachParams } from "@/lib/query"
import { getAPIServerURL } from "@/lib/utils"
import { ClassroomGameResults } from "@/types"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"

export default async function getAllRecordsEndGame(
  gameId: string,
  options: Partial<PagedRequest>
) {
  const token = getToken()
  //Convert object to query string
  const params = toURLSeachParams(options)

  const option: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.token}`,
    },
    next: {
      tags: [`classroom_game_` + `${gameId}` + `_result`],
      revalidate: 60, // revalidate every 60 seconds
    },
  }

  const url = getAPIServerURL(`/game/${gameId}/all-user-record/?` + params)

  return fetch(url, option)
    .then(async (res) => {
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message)
      }
      return data
    })
    .then((res: PagedResponse<ClassroomGameResults>) => ({
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

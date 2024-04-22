"use server"

import { TAPIResult } from "@/app/[locale]/(main)/quizbank/add/actions/add-quiz-bank-action"
import { getToken } from "@/lib/auth"
import { toURLSeachParams } from "@/lib/query"
import { getAPIServerURL } from "@/lib/utils"
import { User } from "@/types"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"

type Props = {
  filter: Partial<PagedRequest>
  postId: string
}
async function getViewDetails({
  filter,
  postId,
}: Props): Promise<TAPIResult<PagedResponse<User>>> {
  const query = toURLSeachParams({
    ...filter,
    sortBy: "created",
    sortDirection: "DESC",
  })
  const token = getToken().token
  const url = getAPIServerURL(`/post/${postId}/views?${query.toString()}`)
  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["posts", `view-${postId}`],
      revalidate: 1, // revalidate every 60 seconds
    },
  }
  return fetch(url, options)
    .then(async (res) => {
      const json = await res.json()
      if (!res.ok) {
        throw new Error(json.message)
      }
      return json
    })
    .then((res: PagedResponse<User>) => {
      return {
        ok: true,
        message: "success",
        data: res,
      }
    })
    .catch((error) => {
      return {
        ok: false,
        message: error.message as string,
        data: undefined,
      }
    })
}

export default getViewDetails

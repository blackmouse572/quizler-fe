"use server"
import { TAPIResult } from "@/app/[locale]/(main)/quizbank/add/actions/add-quiz-bank-action"
import { getToken } from "@/lib/auth"
import { toURLSeachParams } from "@/lib/query"
import { getAPIServerURL } from "@/lib/utils"
import { Game } from "@/types"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"

type Props = {
  filter: Partial<PagedRequest>
  classroomId: string
}
async function getAllGamesByClassroomAction({
  filter,
  classroomId,
}: Props): Promise<TAPIResult<PagedResponse<Game>>> {
  const query = toURLSeachParams({
    ...filter,
    search:
      filter.search && filter.search.length > 0 ? filter.search : undefined,
    sortBy: "created",
    sortDirection: "DESC",
  })
  const token = getToken().token
  const url = getAPIServerURL(
    `/Game/get-all-by-classroom/${classroomId}?${query.toString()}`
  )
  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["games", `game-classroom-${classroomId}`],
      revalidate: 60, // revalidate every 60 seconds
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
    .then((res: PagedResponse<Game>) => {
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

export default getAllGamesByClassroomAction

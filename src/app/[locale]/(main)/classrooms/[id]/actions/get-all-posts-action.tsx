"use server"
import { TAPIResult } from "@/app/[locale]/(main)/quizbank/add/actions/add-quiz-bank-action"
import { getToken } from "@/lib/auth"
import { toURLSeachParams } from "@/lib/query"
import { getAPIServerURL } from "@/lib/utils"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"
import { Post } from "@/types/postsData"

type Props = {
  filter: Partial<PagedRequest>
  classroomId: string
}
async function getAllPostActions({
  filter,
  classroomId,
}: Props): Promise<TAPIResult<PagedResponse<Post>>> {
  const query = toURLSeachParams({
    ...filter,
    sortBy: "created",
    sortDirection: "DESC",
  })
  const token = getToken().token
  const url = getAPIServerURL(
    `/post/classroom/${classroomId}?${query.toString()}`
  )
  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["posts"],
      revalidate: 60, // revalidate every 60 seconds
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
    .then((res: PagedResponse<Post>) => {
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
        data: null,
      }
    })
}

export default getAllPostActions

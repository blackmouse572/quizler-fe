"use server"

import { getToken } from "@/lib/auth"
import { toURLSeachParams } from "@/lib/query"
import { getAPIServerURL } from "@/lib/utils"
import { Classroom } from "@/types"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"

type Props = {
  filter: Partial<PagedRequest>
}

export default async function getAllClassroomsAction({ filter }: Props) {
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
      tags: ["AdminClassrooms"],
      revalidate: 1, // Revalidate every 60 second
    },
  }
  const url = getAPIServerURL("/Classrooms") + "?" + query

  const res = await fetch(url, option)
    .then(async (res) => {
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message)
      }
      return data
    })
    .then((res: PagedResponse<Classroom>) => {
      return {
        ok: true,
        message: "success",
        data: res,
      }
    })
    .catch((err) => {
      console.error(`[ERROR] getAllClassroomsAction: `, err.message)
      return {
        ok: false,
        message: err.message,
        data: null,
      }
    })
  return res
}

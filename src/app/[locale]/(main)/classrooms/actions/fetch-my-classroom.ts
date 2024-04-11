"use server"
import { getToken } from "@/lib/auth"
import { toURLSeachParams } from "@/lib/query"
import { getAPIServerURL } from "@/lib/utils"
import { Classroom } from "@/types"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"

export const fetchMyClassrooms = async (filter: Partial<PagedRequest>) => {
  const searchParams = toURLSeachParams(filter)
  console.log(filter)
  const URL = getAPIServerURL(
    `/classrooms/getCurrent?${searchParams.toString()}`
  )
  const token = getToken().token

  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["classrooms"],
      revalidate: 60,
    },
  }

  return fetch(URL, options)
    .then(async (res) => {
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message)
      }
      return data
    })
    .then((res: PagedResponse<Classroom>) => ({
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

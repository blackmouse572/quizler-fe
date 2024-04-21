"use server"

import { toURLSeachParams } from "@/lib/query"
import { getAPIServerURL } from "@/lib/utils"
import { User } from "@/types"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"

type Props = {
  options: Partial<PagedRequest>
}

export default async function getAllUsersAction({ options }: Props) {
  const query = toURLSeachParams({
    ...options,
    sortBy: "created",
    sortDirection: "DESC",
  })
  const option: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      tags: ["AdminUser"],
      revalidate: 1, // Revalidate every 60 second
    },
  }
  const url = getAPIServerURL("/accounts") + "?" + query

  const res = await fetch(url, option)
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
      console.error(`[ERROR] getAllUsersAction: `, err.message)
      return {
        ok: false,
        message: err.message,
        data: null,
      }
    })
  return res
}

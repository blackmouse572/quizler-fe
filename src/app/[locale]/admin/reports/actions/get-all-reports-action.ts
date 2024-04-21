"use server"

import { getToken } from "@/lib/auth"
import { toURLSeachParams } from "@/lib/query"
import { getAPIServerURL } from "@/lib/utils"
import { ReportType } from "@/types"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"

type Props = {
  filter: Partial<PagedRequest>
}

export default async function getAllReportsAction({ filter }: Props) {
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
      tags: ["AdminReport"],
      revalidate: 1, // Revalidate every 60 second
    },
  }
  const url = getAPIServerURL("/report") + "?" + query

  const res = await fetch(url, option)
    .then(async (res) => {
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message)
      }
      return data
    })
    .then((res: PagedResponse<ReportType>) => {
      return {
        ok: true,
        message: "success",
        data: res,
      }
    })
    .catch((err) => {
      console.error(`[ERROR] getAllReportsAction: `, err.message)
      return {
        ok: false,
        message: err.message,
        data: null,
      }
    })
  return res
}

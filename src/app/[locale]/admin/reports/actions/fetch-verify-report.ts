"use server"

import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { ReportType } from "@/types"
import PagedResponse from "@/types/paged-response"


export default async function fetchVerifyReport(reportId: string) {
  const token = getToken().token

  const option: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const url = getAPIServerURL(`/report/verify${reportId}`)

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
      return {
        ok: false,
        message: err.message,
        data: null,
      }
    })
  return res
}

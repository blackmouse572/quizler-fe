"use server"

import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { revalidateTag } from "next/cache"


export default async function fetchVerifyReport(reportId: string) {
  const token = getToken().token

  const option: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  const url = getAPIServerURL(`/report/verify/${reportId}`)

  const res = await fetch(url, option)
    .then(async (res) => {
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message)
      }
      return true;
    })
    .then((res) => {
      revalidateTag("AdminReport")
      return {
        ok: true,
        message: "success",
      }
    })
    .catch((err) => {
      return {
        ok: false,
        message: err.message,
      }
    })
  return res
}

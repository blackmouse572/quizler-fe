"use server"

import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { revalidateTag } from "next/cache"

export default async function fetchDeleteReport(reportIds: number[]) {
  const token = getToken().token

  const option: RequestInit = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ reportIds: reportIds }),
  }
  const url = getAPIServerURL(`/report`)

  const res = await fetch(url, option)
    .then(async (res) => {
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message)
      }
      return true
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

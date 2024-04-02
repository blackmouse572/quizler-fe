"use server"

import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { ReportType } from "@/types"
import { revalidatePath, revalidateTag } from "next/cache"

export async function reportQuizbankAction(quizbankId: string, reason: string) {
  const token = getToken().token

  const option: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ quizbankId, reason }),
    next: {
      revalidate: 60, // Revalidate every 60 second
    },
  }

  const url = getAPIServerURL(`/report`)
  const res = await fetch(url, option)
    .then(async (res) => {
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message)
      }
      return data
    })
    .then((res: ReportType) => {
      revalidateTag(`AdminReport`)
      revalidatePath(`/admin/reports`)
      return {
        ok: true,
        message: "success",
        data: res,
      }
    })
    .catch((err) => {
      console.error(`[ERROR] reportQuizbankAction: `, err.message)
      return {
        ok: false,
        message: err.message,
        data: null,
      }
    })
  return res
}

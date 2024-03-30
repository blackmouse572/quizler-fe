"use server"
import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { revalidateTag } from "next/cache"

export async function readNotificationAction(notificationId: string) {
  const url = getAPIServerURL(`/Notification/read/${notificationId}`)
  const token = getToken().token

  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
    .then((res) => {
      revalidateTag("notification")
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

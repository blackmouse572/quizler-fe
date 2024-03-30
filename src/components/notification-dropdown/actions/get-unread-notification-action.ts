"use server"
import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"

export async function getUnreadNotificationAction() {
  const url = getAPIServerURL("/Notification/unread")
  const token = getToken().token
  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["notification"],
      revalidate: 100, // 100 seconds
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
    .then((res: number) => {
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

"use server"
import { getToken } from "@/lib/auth"
import { toURLSeachParams } from "@/lib/query"
import { getAPIServerURL } from "@/lib/utils"
import { INotification } from "@/types"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"

export async function getNotificationAction(filter?: Partial<PagedRequest>) {
  const url = getAPIServerURL("/Notification/GetCurrentNotifications")
  const token = getToken().token
  const query = toURLSeachParams(filter)

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

  return fetch(`${url}?${query.toString()}`, options)
    .then(async (res) => {
      const json = await res.json()
      if (!res.ok) {
        throw new Error(json.message)
      }
      return json
    })
    .then((res: PagedResponse<INotification>) => {
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

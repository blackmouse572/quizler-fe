"use server"

import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { User } from "@/types"

export async function sendInviteAction(users: User[], classroomId: string) {
  const url = getAPIServerURL(
    `/classrooms/sent-invitation-email/${classroomId}`
  )
  const { token } = getToken()
  const body = JSON.stringify({ memberIds: users.map((user) => user.id) })
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body,
  }

  return fetch(url, options)
    .then(async (res) => {
      const json = await res.json()
      if (!res.ok) {
        console.log("error", json)
        throw new Error(json.message)
      }
      return json
    })
    .then((res) => {
      return {
        ok: true,
        message: "success",
        data: res,
      }
    })
    .catch((error) => {
      return {
        ok: false,
        message: error.message,
        data: null,
      }
    })
}

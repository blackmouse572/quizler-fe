"use server"

import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { revalidateTag } from "next/cache"

export type TBanAPIProps = {
  classroomId: string
  memberIds: number[]
  action: "ban" | "unban"
}

export async function banAndUnbanMemberAction({
  classroomId,
  memberIds,
  action,
}: TBanAPIProps) {
  const url = getAPIServerURL(`/classrooms/${+classroomId}/users`)
  const { token } = getToken()
  const members = { memberIds: memberIds }
  const options: RequestInit = {
    method: action === "ban" ? "POST" : "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(members),
  }

  return fetch(url, options)
    .then(async (res) => {
      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.message)
      }
      return true
    })
    .then((data) => {
      revalidateTag(`classroom_management`)
      return {
        ok: true,
        message: "success",
        data: data,
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

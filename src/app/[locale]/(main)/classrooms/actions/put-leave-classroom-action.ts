"use server"

import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { revalidatePath, revalidateTag } from "next/cache"

export async function leaveClassroomAction(classroomId: string) {
  const url = getAPIServerURL(`/classrooms/${classroomId}/leave`)
  const token = getToken().token

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }

  return fetch(url, options)
    .then(async (res) => {
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message)
      }

      return true
    })
    .then((e) => {
      return {
        ok: true,
        message: "success",
        data: e,
      }
    })
    .catch((e) => {
      return {
        ok: false,
        message: e.message,
        data: null,
      }
    })
    .finally(() => {
      revalidatePath("/classrooms")
      revalidateTag("/classrooms")
    })
}

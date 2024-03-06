"use server"

import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { ActionResponse, ClassroomInvitation } from "@/types"

async function getClassroomInviteCodeAction(
  classroomId: string
): Promise<ActionResponse<ClassroomInvitation>> {
  const url = getAPIServerURL(`/api/classrooms/generatecode/${classroomId}`)
  const { token } = getToken()
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
        throw new Error(json)
      }
      return json
    })
    .then((res: ClassroomInvitation) => {
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
      }
    })
}

export { getClassroomInviteCodeAction }

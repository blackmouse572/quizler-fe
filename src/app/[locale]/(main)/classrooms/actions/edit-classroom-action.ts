"use server"

import { AddClassroom } from "@/app/[locale]/(main)/classrooms/components/add-classroom-form"
import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { revalidateTag } from "next/cache"

export async function editClassroom(classroomId: string, data: AddClassroom) {
  const url = getAPIServerURL("/classrooms/update")
  const { token } = getToken()
  const body = JSON.stringify({ id: classroomId, ...data })
  const options: RequestInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body,
  }

  return fetch(url, options)
    .then(async (res) => {
      revalidateTag("classroom-details")
      revalidateTag(`classroom-details-${classroomId}`)
      const json = await res.json()
      if (!res.ok) {
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

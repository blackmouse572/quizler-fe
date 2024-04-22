"use server"
import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { ActionResponse } from "@/types"
import { revalidatePath, revalidateTag } from "next/cache"

export async function joinClassroomAction(
  params: string
): Promise<ActionResponse<never>> {
  const URL = getAPIServerURL(`/classrooms/join/${params}`)
  const token = getToken()
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.token}`,
    },
  }

  return fetch(URL, options)
    .then(async (response) => {
      if (!response.ok) {
        return Promise.reject(await response.json())
      }
      return response
    })
    .then((response) => {
      return {
        ok: true,
        message: "",
      }
    })
    .catch((error) => {
      return {
        ok: false,
        message: error.message,
      }
    })
    .finally(() => {
      revalidatePath("/classrooms")
      revalidateTag("/classrooms")
    })
}

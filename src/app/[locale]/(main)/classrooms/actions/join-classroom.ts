"use server"
import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { ActionResponse } from "@/types"
import { revalidatePath } from "next/cache"

export async function joinClassroomAction(
  params: string
): Promise<ActionResponse<never>> {
  const URL = getAPIServerURL(`/api/classrooms/join/${params}`)
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
      console.log(response)
      const json = await response.json()
      if (!response.ok) {
        return Promise.reject(json)
      }
      return json
    })
    .then((response) => {
      revalidatePath("/classrooms")
      return {
        ok: true,
        message: response.message,
      }
    })
    .catch((error) => {
      return {
        ok: false,
        message: error.message,
      }
    })
}

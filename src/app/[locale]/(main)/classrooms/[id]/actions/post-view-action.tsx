"use server"

import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { Post } from "@/types/postsData"
import { revalidateTag } from "next/cache"
export async function postViewAction(id: string, classroomId: string) {
  const url = getAPIServerURL(`/post/addview/${id}`)
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
        throw new Error(json.message)
      }
      return json
    })
    .then((data: Post) => {
      revalidateTag(`post-classroom-${classroomId}`)
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

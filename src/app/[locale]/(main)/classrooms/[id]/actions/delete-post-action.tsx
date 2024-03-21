"use server"

import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { revalidateTag } from "next/cache"

export async function deletePostAction(id: string) {
  const url = getAPIServerURL(`/post/${id}`)
  const { token } = getToken()
  const options: RequestInit = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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
      revalidateTag("posts")
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

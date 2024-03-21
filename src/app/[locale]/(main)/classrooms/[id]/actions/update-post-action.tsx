"use server"

import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { Post } from "@/types"
import { revalidateTag } from "next/cache"

export async function updatePostAction(newPost: Post) {
  const url = getAPIServerURL(`/post/${newPost.id}`)
  const { token } = getToken()
  const options: RequestInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newPost),
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
        message: error.message as string,
        data: null,
      }
    })
}

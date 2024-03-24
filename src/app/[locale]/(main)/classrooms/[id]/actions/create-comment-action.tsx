"use server"

import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { revalidateTag } from "next/cache"
type NewComment = {
  postId: string
  content: string
}

export async function createCommentAction(payload: NewComment) {
  const url = getAPIServerURL(`/post/${payload.postId}/comments`)
  const { token } = getToken()
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  }

  return fetch(url, options)
    .then(async (res) => {
      const json = await res.json()
      if (!res.ok) {
        throw new Error(json.message)
      }
      return json
    })
    .then((data: Comment) => {
      revalidateTag(`comment-posts-${payload.postId}`)
      return {
        ok: true,
        message: "success",
        data,
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

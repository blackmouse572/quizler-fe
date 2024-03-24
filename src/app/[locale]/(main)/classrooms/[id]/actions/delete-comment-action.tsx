"use server"

import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { Post } from "@/types/postsData"
import { revalidateTag } from "next/cache"
type Payload = {
  commentId: string
  postId: string
}

export async function deleteCommentAction(payload: Payload) {
  const url = getAPIServerURL(`/post/comments/${payload.commentId}`)
  const { token } = getToken()
  const options: RequestInit = {
    method: "DELETE",
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
    .then((data: Post) => {
      revalidateTag(`comment-posts-${payload.postId}`)
      return {
        ok: true,
        message: "success",
      }
    })
    .catch((error) => {
      return {
        ok: false,
        message: error.message,
      }
    })
}

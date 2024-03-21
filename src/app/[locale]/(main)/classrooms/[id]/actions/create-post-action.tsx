"use server"

import { NewPost } from "@/app/[locale]/(main)/classrooms/[id]/components/new-post"
import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { Post } from "@/types/postsData"
import { revalidateTag } from "next/cache"

export async function createNewPost(data: NewPost) {
  const url = getAPIServerURL(`/post`)
  const { token } = getToken()
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
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
        message: error.message,
        data: null,
      }
    })
}

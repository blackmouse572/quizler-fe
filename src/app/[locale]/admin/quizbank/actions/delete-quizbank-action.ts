"use server"

import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import QuizBank from "@/types/QuizBank"
import PagedResponse from "@/types/paged-response"
import { revalidateTag } from "next/cache"

type Props = {
  id: string
}

export default async function deleteQuizBankAction({ id }: Props) {
  const token = getToken().token
  const option: RequestInit = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: {
      revalidate: 1, // Revalidate every 60 second
    },
  }
  const url = getAPIServerURL(`/quizbank/${id}`)
  const res = await fetch(url, option)
    .then(async (res) => {
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message)
      }
      return data
    })
    .then((res: PagedResponse<QuizBank>) => {
      revalidateTag(`AdminQuizBank`)
      return {
        ok: true,
        message: "success",
        data: res,
      }
    })
    .catch((err) => {
      console.error(`[ERROR] deleteQuizBankAction: `, err.message)
      return {
        ok: false,
        message: err.message,
        data: null,
      }
    })
  return res
}

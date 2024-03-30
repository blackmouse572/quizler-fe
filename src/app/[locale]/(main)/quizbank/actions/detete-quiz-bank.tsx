"use server"
import { getAPIServerURL } from "@/lib/utils"
import { revalidatePath, revalidateTag } from "next/cache"

export async function deleteQuizBank(token: string, quizbankId: string) {
  const url = getAPIServerURL(`/quizbank/${quizbankId}`)

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  return fetch(url, options).then(async (res) => {
    if (!res?.ok) {
      return {
        isSuccess: false,
        message: res.statusText,
      }
    }
    revalidatePath("/quizbank")
    revalidateTag("QuizBank")
    return {
      isSuccess: true,
    }
  })
}

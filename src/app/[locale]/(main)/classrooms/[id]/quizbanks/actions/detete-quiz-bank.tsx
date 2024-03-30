"use server"
import { getAPIServerURL } from "@/lib/utils"
import { revalidatePath, revalidateTag } from "next/cache"

export async function deleteQuizBank(
  token: string,
  classroomId: string,
  quizbankId: string
) {
  const url = getAPIServerURL(`/quizbank/${quizbankId}`)

  const options = {
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
      revalidatePath(`/classrooms/${classroomId}/quizbanks`)
      revalidateTag(`classroom-${classroomId}-quizbanks`)
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

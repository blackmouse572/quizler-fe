"use server"
import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { revalidatePath, revalidateTag } from "next/cache"

export const deleteClassroom = async (classroomId: string) => {
  const URL = getAPIServerURL(`/classrooms/${classroomId}`)
  const { token } = getToken()

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }

  return fetch(URL, options).then(async (res) => {
    if (!res?.ok) {
      return {
        isSuccess: false,
        message: res.statusText,
      }
    }
    revalidatePath("/classrooms")
    revalidatePath("classrooms")
    revalidateTag(`classroom-details-${classroomId}`)
    revalidateTag("classroom-details")
    revalidateTag("classrooms")
    return {
      isSuccess: true,
      message: "",
    }
  })
}

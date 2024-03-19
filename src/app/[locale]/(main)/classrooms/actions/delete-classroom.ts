"use server"
import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"

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
    return {
      isSuccess: true,
      message: ''
    }
  })
}

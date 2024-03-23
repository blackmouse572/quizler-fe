"use server"

import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { User } from "@/types"
import PagedResponse from "@/types/paged-response"

export const getAllMembers = async (
  classroomId: string
): Promise<PagedResponse<User>> => {
  const URL = getAPIServerURL(`/classrooms/get-all-member/${classroomId}`)
  const { token } = getToken()

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }

  return fetch(URL, options)
    .then(async (res) => res.json())
    .catch((err) => {
      console.error(`[ERROR] getQuizBank: ${URL} `, err)
      throw new Error(err)
    })
}

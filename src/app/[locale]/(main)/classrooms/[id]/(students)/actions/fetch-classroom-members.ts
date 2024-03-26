"use server"

import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { Classroom, User } from "@/types"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"

export type StudentClasroomData = {
  account: User,
  classroom: Classroom,
  joinDate: string
}

export default async function getAllMembers(
  classroomId: string,
  options: Partial<PagedRequest>
): Promise<PagedResponse<StudentClasroomData>> {
  const token = getToken()
  //Convert object to query string
  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(options)) {
    if (value !== undefined) {
      params.set(key, String(value)) // Ensure value is a string
    }
  }

  const option: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.token}`,
    },
    next: {
      tags: ["classroom_management"],
      revalidate: 60, // revalidate every 60 seconds
    },
  }

  const url = getAPIServerURL(
    `/classrooms/get-all-member/${classroomId}?` + params
  )

  return fetch(url, option)
    .then(async (res) => res.json())
    .catch((err) => {
      console.error(`[ERROR] getQuizBank: ${URL} `, err)
      throw new Error(err)
    })
}

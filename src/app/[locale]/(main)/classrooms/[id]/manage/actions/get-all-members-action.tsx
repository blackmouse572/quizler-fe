"use server"

import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { ClassroomMembers } from "@/types"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"

export default async function getAllMembers(
  classroomId: string, options: Partial<PagedRequest>
) {
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
      tags: ["classrooms"],
      revalidate: 60, // revalidate every 60 seconds
    },
  }

  const url = getAPIServerURL(`/classrooms/get-all-member/${classroomId}?` + params)

  const res: PagedResponse<ClassroomMembers> = await fetch(url, option)
    .then((res) => res.json())
    .catch((err) => {
      console.error(`[ERROR] getClassroomMembers: ${url} `, err)
      throw new Error(err)
    })
  return res
}

"use server"

import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"

async function getClassroomDetails(id: string) {
  const url = getAPIServerURL(`/classrooms/${id}`)
  const { token } = getToken()
  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }

  return fetch(url, options)
    .then(async (res) => {
      const json = await res.json()
      if (!res.ok) {
        throw new Error(json)
      }
      return json
    })
    .then((res: Classroom) => {
      return {
        ok: true,
        message: "success",
        data: res,
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

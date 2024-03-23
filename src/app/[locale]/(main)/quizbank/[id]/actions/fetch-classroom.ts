"use server"
import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"

export async function fetchClassroomByUserId( userId: string) {
  const URL = getAPIServerURL(`/classrooms/getbyaccountid/${userId}`)
  const { token } = getToken()

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }

  return fetch(URL, options).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response.json()
  })
}

export async function fetchClassroomCurrentUser() {
  const URL = getAPIServerURL(`/classrooms/getcurrent`)
  const { token } = getToken()
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }

  return fetch(URL, options).then(async (response) => {
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    }
    const result = await response.json()
    return result
  })
}

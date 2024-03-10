import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"

export const fetchMyClassrooms = async () => {
  const URL = getAPIServerURL(`/classrooms`)
  const token = getToken().token

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  }

  const res = await fetch(URL, options).then(async (response) => {
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    }
    return response
  })

  return res
}
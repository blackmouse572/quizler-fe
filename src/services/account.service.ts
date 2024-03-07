import { getAPIServerURL } from "@/lib/utils"

export function getUserProfile(token: string) {
  return fetch(getAPIServerURL("/account/profile"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return response.json()
  })
}

export function fetchClassroomByUserId(token: string, userId: string) {
  const URL = getAPIServerURL(`/classrooms/getbyaccountid/${userId}`)

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

export function fetchClassroomCurrentUser(token: string) {
  const URL = getAPIServerURL(`/classrooms/getcurrent`)

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
    return result;
  })
}

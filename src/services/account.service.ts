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

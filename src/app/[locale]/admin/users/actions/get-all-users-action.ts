import { getAPIServerURL } from "@/lib/utils"
import { User } from "@/types"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"

export default async function getAllUsersAction(options: Partial<PagedRequest>) {
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
    },
    next: {
      revalidate: 1, // Revalidate every 1 second
    },
  }
  const url = getAPIServerURL("/accounts") + "?" + params

  const res = await fetch(url, option)
    .then(async (res) => {
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message)
      }
      return data
    })
    .then((res: PagedResponse<User>) => ({
      ok: true,
      message: "success",
      data: res,
    }))
    .catch((err) => {
      console.error(`[ERROR] getAllUsersAction: `, err.message)
      return {
        ok: false,
        message: err.message,
        data: null,
      }
    })
  return res
}

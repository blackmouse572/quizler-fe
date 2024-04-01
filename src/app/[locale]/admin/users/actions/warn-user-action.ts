import { getAPIServerURL } from "@/lib/utils"
import { User } from "@/types"
import PagedResponse from "@/types/paged-response"

export default async function warnUserAction(id: string) {
  const option: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60, // Revalidate every 60 second
    },
  }
  const url = getAPIServerURL(`/accounts/warning/${id}`)
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
      console.error(`[ERROR] warnUserAction: `, err.message)
      return {
        ok: false,
        message: err.message,
        data: null,
      }
    })
  return res
}

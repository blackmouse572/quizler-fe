"use server"
import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { revalidatePath, revalidateTag } from "next/cache"

export async function cancelPlan() {
  const token = getToken().token
  const url = getAPIServerURL("/checkout/cancel")

  const options: RequestInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }

  return fetch(url, options)
    .then(async (res) => {
      if (!res.ok) {
        const json = await res.json()
        throw Error(json.message)
      }
      return true
    })
    .then((res) => {
      revalidatePath("/profile/account")
      revalidateTag("Plan")
      return {
        data: res,
        ok: true,
        message: "Subscription cancelled successfully",
      }
    })
    .catch((err) => {
      return {
        data: false,
        ok: false,
        message: err.message,
      }
    })
}

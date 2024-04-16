"use server"

import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { Plan } from "@/types"
import { revalidatePath, revalidateTag } from "next/cache"

export const saveTransaction = (sessionId: string) => {
  const URL = getAPIServerURL(`/checkout/success?sessionId=${sessionId}`)
  const { token } = getToken()

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: {
      revalidate: 0,
    },
  }

  return fetch(URL, options)
    .then(async (res) => {
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message)
      }
      return true
    })
    .then((res) => {
      return { ok: true, message: "", data: res }
    })
    .catch((err) => {
      return {
        ok: false,
        message: err.message,
        data: "",
      }
    })
    .finally(() => {
      revalidateTag("Plan")
      revalidatePath("/profile/account")
    })
}

export const fetchStripeSessionId = ({ id }: Plan) => {
  const URL = getAPIServerURL(`/checkout?planId=${id}`)
  const { token } = getToken()

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }

  return fetch(URL, options)
    .then(async (res) => {
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message)
      }
      return data
    })
    .then((res) => {
      revalidatePath("/profile/account")
      revalidateTag("Plan")
      return { ok: true, message: "", data: res }
    })
    .catch((err) => {
      return {
        ok: false,
        message: err.message,
        data: "",
      }
    })
}

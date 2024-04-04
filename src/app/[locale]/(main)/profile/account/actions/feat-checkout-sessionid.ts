"use server"

import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { AccountPlan } from "../type"

const fechRedirectToStripe = (sessionId: string) => {
  const URL = getAPIServerURL(`/checkout/success?sessionId=${sessionId}`)
  const { token } = getToken()

  const options = {
    method: "GET",
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
      return res
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
}

export const fetchStripeSessionId = (plan: AccountPlan) => {
  const URL = getAPIServerURL(`/checkout`)
  const { token } = getToken()

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(plan),
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

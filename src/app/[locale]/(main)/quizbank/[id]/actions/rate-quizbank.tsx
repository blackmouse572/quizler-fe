"use server"

import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"

export async function rateQuizbankAction(quizbankId: string, rating: number) {
  const URL = getAPIServerURL(`/quizbank/rating/${quizbankId}?star=${rating}`)
  const token = getToken().token
  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    const json = await res.json()
    if (!res.ok) {
      throw new Error(json.message)
    }
    const data = await json
    return {
      ok: true,
      message: "Success",
      data,
    }
  } catch (err) {
    const error = err as Error
    return {
      ok: false,
      message: error.message,
      data: undefined,
    }
  }
}

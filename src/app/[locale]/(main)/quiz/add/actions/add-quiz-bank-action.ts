"use server"

import { getAPIServerURL } from "@/lib/utils"
import { AddQuizbank } from "../components/add-quizbank-form"
import { getToken } from "@/lib/auth"

export const addQuizBankAction = (data: AddQuizbank) => {
  const url = getAPIServerURL("/quizbank")
  const { token } = getToken()
  const body = JSON.stringify(data)
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body,
  }

  return fetch(url, { ...options, body })
    .then(async (res) => {
      const json = await res.json()
      if (!res.ok) {
        throw new Error(json)
      }
      return json
    })
    .then((res) => {
      return {
        ok: true,
        message: "success",
        data: res,
      }
    })
    .catch((error) => {
      return {
        ok: false,
        data: null,
        message: error.message,
      }
    })
}

"use server"

import { ForgotPasswordSchemaType } from "../validations/forgot-password-validate"
import { getAPIServerURL } from "@/lib/utils"

export const ForgotPasswordAction = async (
  values: ForgotPasswordSchemaType
) => {
  const URL = getAPIServerURL("/auth/forgot-password")
  const { email } = values

  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
    cache: "no-cache",
  }

  const res = await fetch(URL, options)
    .then(async (response) => {
      if (!response.ok) {
        const err = await response.json()
        throw Error(err.message)
      }
      return response.json()
    })
    .then((response) => {
      return {
        ok: true,
        message: response.message,
      }
    })
    .catch((error) => {
      return {
        ok: false,
        message: error.message,
        data: null,
      }
    })

  return res
}

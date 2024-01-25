"use server"

import { revalidatePath } from "next/cache"

import { setToken } from "@/lib/auth"
import { ChangePasswordSchemaType } from "../validations/change-password-validate"
import { getAPIServerURL } from "@/lib/utils"

export const ChangePasswordAction = async (
  values: ChangePasswordSchemaType
) => {
  const URL = getAPIServerURL("/auth/reset-password")
  const { password, token } = values

  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, token }),
    cache: "no-cache",
  }

  return fetch(URL, options)
    .then((response) => response.json())
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.message)
      }
      return {
        ok: true,
        message: response.message,
      }
    })
    .catch((error) => {
      return {
        ok: false,
        message: error.message,
      }
    })
}

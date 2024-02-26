"use server"

import { revalidatePath } from "next/cache"

import { getAPIServerURL } from "@/lib/utils"
import { VerifySignUpSchemaType } from "../vaidations/verify-sign-up-validate"

export const VerifySignUpAction = async (values: VerifySignUpSchemaType) => {
  const URL = getAPIServerURL("/auth/verify-email")

  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
    cache: "no-cache",
  }

  return fetch(URL, options)
    .then(async (response) => {
      const json = await response.json()
      if (!response.ok) {
        return Promise.reject(json)
      }
      return json
    })
    .then((response) => {
      revalidatePath("/")
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

"use server"

import { revalidatePath } from "next/cache"

import { setToken } from "@/lib/auth"
import { VerifySignUpSchemaType } from "../vaidations/verify-sign-up-validate"
import { getAPIServerURL } from "@/lib/utils"

export const VerifySignUpAction = async (values: VerifySignUpSchemaType) => {
  const URL = getAPIServerURL("/auth/verify")

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  }

  return fetch(URL, options)
    .then((response) => response.json())
    .then((response) => {
      setToken(response.token)
      revalidatePath("/")
      return {
        ok: true,
        message: response.message,
        token: response.token,
      }
    })
    .catch((error) => {
      return {
        ok: false,
        message: error.message,
      }
    })
}

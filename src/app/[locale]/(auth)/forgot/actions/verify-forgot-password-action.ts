"use server"

import { revalidatePath } from "next/cache"

import { setToken } from "@/lib/auth"
import { VerifyForgotPasswordSchemaType } from "../validations/verify-forgot-password-validate"

export const VerifyForgotPasswordAction = async (values: VerifyForgotPasswordSchemaType) => {
  const URL = "https://api.escuelajs.co/api/v1/auth/forgot-password"

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

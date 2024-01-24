"use server"

import { revalidatePath } from "next/cache"

import { setToken, signJWT } from "@/lib/auth"
import { ForgotPasswordSchemaType } from "../validations/forgot-password-validate"

export const ForgotPasswordAction = async (
  values: ForgotPasswordSchemaType
) => {
  const URL = "http://localhost:5000/api/Authen/forgot-password"
  const { email } = values

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  }

  return fetch(URL, options)
    .then(async (response) => {
      if (!response.ok) {
        const err = await response.json()
        throw Error(err.message)
      }
      return response.json()
    })
    .then((response) => {
      const token = signJWT("forgot", {
        email: email,
      })
      revalidatePath("/")
      return {
        ok: true,
        message: response.message,
        data: token,
      }
    })
    .catch((error) => {
      console.error(error)
      return {
        ok: false,
        message: error.message,
        data: null,
      }
    })
}

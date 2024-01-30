"use server"

import { VerifyForgotPasswordSchemaType } from "../validations/verify-forgot-password-validate"
import { getAPIServerURL } from "@/lib/utils"
type Result = {
  ok: boolean
  message: string
  token: string | undefined
}
export const VerifyForgotPasswordAction = async (
  values: VerifyForgotPasswordSchemaType
): Promise<Result> => {
  const URL = getAPIServerURL("auth/validate-reset-token")

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  }

  const res: Promise<Result> = fetch(URL, options)
    .then((response) => {
      if (!response.ok) {
        throw response
      }
      return response.json()
    })
    .then((response) => {
      return {
        ok: true,
        message: response.message,
        token: response.data.token,
      }
    })
    .catch((error) => {
      console.error("[Error at verify forgot password]", error)
      return {
        ok: false,
        message: error.message,
        token: undefined,
      }
    })

  return res
}

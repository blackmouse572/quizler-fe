"use server"
import { validateJWT } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { JwtPayload } from "jsonwebtoken"

export const ResentEmailAction = async (token: string) => {
  const URL = getAPIServerURL("/auth/forgot-password")
  const jwt = validateJWT(
    token,
    process.env.FORGOT_PASSWORD_SECRET!
  ) as JwtPayload
  if (!jwt)
    return {
      ok: false,
      message: "not valid token",
      data: undefined,
    }
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: jwt.email }),
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
      console.log({ response, URL })
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

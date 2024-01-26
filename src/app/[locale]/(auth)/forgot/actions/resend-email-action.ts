"use server"
import { validateJWT } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { JwtPayload } from "jsonwebtoken"

export const ResentEmailAction = async (email: string) => {
  const URL = getAPIServerURL("/auth/forgot-password")
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
    cache: "no-cache",
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
      }
    })
    .catch((error) => {
      console.error(error)
      return {
        ok: false,
        message: error.message,
      }
    })
}

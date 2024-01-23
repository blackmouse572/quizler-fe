"use server"
import { setRefreshToken, setToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { User } from "@/types/User"
import { getTranslations } from "next-intl/server"
import { revalidatePath } from "next/cache"

export const LoginGoogleAction = async (token: string) => {
  const URL = getAPIServerURL("/auth/login/google")
  const t = await getTranslations()
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  }

  const data = await fetch(URL, options)
    .then(async (response) => {
      console.log("[API response]")
      console.table({
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
      })
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message)
      }
      return response.json()
    })
    .then((response: User) => {
      setToken(response.accessToken)
      setRefreshToken(response.refreshToken)
      revalidatePath("/")
      return {
        ok: true,
        message: t("SignIn.success.index"),
        token: response.accessToken.token,
      }
    })
    .catch((error) => {
      return {
        ok: false,
        message: error.message,
      }
    })

  return data
}

"use server"

import { revalidatePath } from "next/cache"

import { LoginSchemaType } from "@/app/[locale]/(auth)/login/validations/login-validate"
import { setRefreshToken, setToken, setUser } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { User } from "@/types/User"
import { getTranslations } from "next-intl/server"

export const LoginAction = async (values: LoginSchemaType) => {
  const URL = getAPIServerURL("/auth/login")
  const t = await getTranslations()
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  }

  const data = await fetch(URL, options)
    .then(async (response) => {
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message)
      }
      return response.json()
    })
    .then((response: User) => {
      setToken(response.accessToken)
      setRefreshToken(response.refreshToken)
      console.log(response)
      setUser(response)
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

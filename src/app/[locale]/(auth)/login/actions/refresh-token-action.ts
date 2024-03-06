"use server"

import { getRefreshToken, setRefreshToken, setToken, setUser } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { User } from "@/types"
import { revalidatePath } from "next/cache"

export async function refreshTokenAction() {
  const refreshToken = getRefreshToken()
  const url = getAPIServerURL("/auth/refresh-token")
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: refreshToken.token }),
  }

  return fetch(url, options)
    .then(async (res) => {
      const json = await res.json()
      if (!res.ok) {
        throw new Error(json)
      }
      return json
    })
    .then((res: User) => {
      setToken(res.accessToken)
      setRefreshToken(res.refreshToken)
      setUser(res)
      revalidatePath("/")
      return {
        ok: true,
        message: "success",
        data: res,
      }
    })
    .catch((error) => {
      return {
        ok: false,
        message: error.message,
        data: null,
      }
    })
}

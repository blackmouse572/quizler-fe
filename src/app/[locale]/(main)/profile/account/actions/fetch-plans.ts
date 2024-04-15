"use server"

import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { Plan } from "@/types"

export const fetchAllPlans = async () => {
  const URL = getAPIServerURL(`/plan`)
  const token = getToken().token

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }

  return fetch(URL, options)
    .then(async (res) => {
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message)
      }
      return data
    })
    .then((res: Plan[]) => ({
      ok: true,
      message: "success",
      data: res,
    }))
    .catch((err) => {
      return {
        ok: false,
        message: err.message,
        data: null,
      }
    })
}

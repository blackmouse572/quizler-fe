"use server"

import { AddClassroom } from "@/app/[locale]/(main)/classrooms/add/components/add-classroom-form"
import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"

export async function addNewClassroom(data: AddClassroom) {
  const url = getAPIServerURL("/api/classrooms")
  const { token } = getToken()
  const body = JSON.stringify(data)
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body,
  }

  return fetch(url, options)
    .then(async (res) => {
      const json = await res.json()
      if (!res.ok) {
        console.log("error", json)
        throw new Error(json)
      }
      return json
    })
    .then((res) => {
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

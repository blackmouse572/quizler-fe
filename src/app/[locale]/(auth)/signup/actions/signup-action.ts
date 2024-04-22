"use server"

import { revalidatePath } from "next/cache"

import { getAPIServerURL } from "@/lib/utils"
import { SignUpSchemaType } from "../vaidations/sign-up-validate"

export const SignUpAction = async (values: SignUpSchemaType) => {
  const URL = getAPIServerURL("/auth/register")

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  }

  return fetch(URL, options)
    .then(async (response) => {
      const json = await response.json()
      if (!response.ok) {
        throw new Error(json.message)
      }
      return json
    })
    .then((response) => {
      revalidatePath("/")
      return {
        ok: true,
        message: response.message,
      }
    })
    .catch((error) => {
      return {
        ok: false,
        message: error.message,
      }
    })
}

"use server"

import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { revalidatePath } from "next/cache"
import { AddQuizbank } from "../components/add-quizbank-form"

export type TAPIResult<T> =
  | {
      ok: boolean
      message: string
      data: T
    }
  | {
      ok: boolean
      message: any
      data: undefined
    }

export const addQuizBankAction = async (
  data: AddQuizbank
): Promise<TAPIResult<any>> => {
  const url = getAPIServerURL("/quizbank")
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

  try {
    const res = await fetch(url, options)
    const json = await res.json()
    if (!res.ok) {
      throw new Error(json.message)
    }
    const res_1 = await json
    return {
      ok: true,
      message: "success",
      data: res_1,
    }
  } catch (error: any) {
    return {
      ok: false,
      message: error.message,
      data: null,
    }
  }
}

export const editQuizBankAction = (
  data: AddQuizbank,
  quizBankId: string
): Promise<TAPIResult<any>> => {
  const url = getAPIServerURL(`/quizbank/${quizBankId}`)
  const { token } = getToken()

  const body = JSON.stringify(data)
  const options: RequestInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body,
  }

  return fetch(url, { ...options, body })
    .then(async (res) => {
      const json = await res.json()
      if (!res.ok) {
        throw new Error(json)
      }
      return json
    })
    .then((res) => {
      revalidatePath(`/quizbank/${quizBankId}`)
      return {
        ok: true,
        message: "success",
        data: res,
      }
    })
    .catch((error) => {
      return {
        ok: false,
        message: error.message as string,
        data: null,
      }
    })
}

/**
 * Used to update some of the fields, not all fields
 * @param data
 * @param quizBankId
 * @returns
 */
export const updateQuizBankAction = (
  data: Partial<AddQuizbank>,
  quizBankId: string
): Promise<TAPIResult<any>> => {
  const url = getAPIServerURL(`/quizbank/${quizBankId}`)
  const { token } = getToken()

  const body = JSON.stringify(data)
  const options: RequestInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body,
  }

  return fetch(url, { ...options, body })
    .then(async (res) => {
      const json = await res.json()
      if (!res.ok) {
        throw new Error(json)
      }
      return json
    })
    .then((res) => {
      revalidatePath(`/quizbank/${quizBankId}`)
      return {
        ok: true,
        message: "success",
        data: res,
      }
    })
    .catch((error) => {
      return {
        ok: false,
        message: error.message as string,
        data: null,
      }
    })
}

"use server"

import { getAPIServerURL } from "@/lib/utils"
import { AddQuizbank } from "../components/add-quizbank-form"
import { getToken } from "@/lib/auth"

export type TAPIResult = {
  ok: boolean;
  message: string;
  data: any;
} | {
  ok: boolean;
  message: any;
  data: null;
}

export const addQuizBankAction = (data: AddQuizbank): Promise<TAPIResult> => {
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

  return fetch(url, { ...options, body })
    .then(async (res) => {
      const json = await res.json()
      if (!res.ok) {
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

export const editQuizBankAction = (data: AddQuizbank, quizBankId: string): Promise<TAPIResult> => { 
  const url = getAPIServerURL(`/quizbank/${quizBankId}`)
  const { token } = getToken()

  const editData: Partial<AddQuizbank> = {...data}
  delete editData.tags

  console.log(editData)
  const body = JSON.stringify(editData)
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
      console.log("json:", json)
      if (!res.ok) {
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
      debugger;
      console.log("Error:", error.toString())
      return {
        ok: false,
        message: error.message as string,
        data: null,
      }
    })
}

"use server"

import { AddQuizbank } from "@/app/[locale]/(main)/quizbank/add/components/add-quizbank-form"
import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import QuizBank, { TAPIQuizResponse } from "@/types/QuizBank"
import { revalidatePath, revalidateTag } from "next/cache"

export async function getQuizBankDetailPage(id: string) {
  const url = getAPIServerURL(`/quizbank/${id}`)
  const res = await fetch(url)
  const data = (await res.json()) as QuizBank
  return {
    props: {
      data,
    },
  }
}

export async function getQuizByQuizBankId(id: string) {
  const url = getAPIServerURL(`/quiz/${id}`)
  return fetch(url)
    .then(async (res) => {
      const json = await res.json()
      if (!res.ok) {
        throw new Error(json.message)
      }
      return json as TAPIQuizResponse
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
        message: error.message as string,
        data: null,
      }
    })
}

export async function copyQuizBankToClassroom(
  quizbankId: string,
  classroomId: string,
  newName: string
) {
  const url = getAPIServerURL(
    `/classrooms/copyquizbank/${quizbankId}/${classroomId}`
  )
  const { token } = getToken()
  const data: Partial<AddQuizbank> = { bankName: newName }
  const body = JSON.stringify(data)
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body,
  }
  return fetch(url, options)
    .then(async (res) => {
      if (!res?.ok) {
        throw new Error(res.statusText)
      }
      revalidatePath(`/classrooms/${classroomId}/quizbank`)
      revalidateTag("ClassroomQuizBank")
      return {
        ok: true,
      }
    })
    .catch((e) => {
      return {
        ok: false,
        message: e.message as string,
      }
    })
}

export async function copyQuizBankToPersonal(
  newName: string,
  quizbankId: string
) {
  const url = getAPIServerURL(`/quizbank/copyquizbank/${quizbankId}`)
  const { token } = getToken()

  const data: Partial<AddQuizbank> = {
    bankName: newName,
  }
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
      if (!res?.ok) {
        throw new Error(res.statusText)
      }
      revalidatePath("/quizbank")
      revalidateTag("QuizBank")
      return {
        ok: true,
      }
    })
    .catch((e) => {
      return {
        ok: false,
        message: e.message as string,
      }
    })
}

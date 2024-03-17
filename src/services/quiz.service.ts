"use server"

import { getAPIServerURL } from "@/lib/utils"
import QuizBank, { TAPIQuizResponse } from "@/types/QuizBank"

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
        throw new Error(json)
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
  token: string,
  quizbankId: string,
  classroomId: string
) {
  const url = getAPIServerURL(
    `/classrooms/copyquizbank/${quizbankId}/${classroomId}`
  )

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  return fetch(url, options)
    .then(async (res) => {
      if (!res?.ok) {
        throw new Error(res.statusText)
      }
      return {
        ok: true
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
  token: string,
  quizbankId: string
) {
  const url = getAPIServerURL(`/quizbank/copyquizbank/${quizbankId}`)

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }
  return fetch(url, options).then(async (res) => {
    if (!res?.ok) {
      throw new Error(res.statusText)
    }
    return {
      ok: true
    }
  })
  .catch((e) => {
    return {
      ok: false,
      message: e.message as string,
    }
  })
}

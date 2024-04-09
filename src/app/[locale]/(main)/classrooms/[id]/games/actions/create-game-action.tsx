"use server"
import { AddGameFormType } from "@/app/[locale]/(main)/classrooms/[id]/games/components/add-game-form"
import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { Game } from "@/types"
import { revalidateTag } from "next/cache"

export async function createGameAction(payload: AddGameFormType) {
  const url = getAPIServerURL(`/game`)
  const { token } = getToken()
  const options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  }

  return fetch(url, options)
    .then(async (res) => {
      const json = await res.json()
      if (!res.ok) {
        console.log(json)
        throw new Error(json.message)
      }
      return json
    })
    .then((data: Game) => {
      revalidateTag(`game-classroom-${payload.classroomId}`)
      return {
        ok: true,
        message: "success",
        data,
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

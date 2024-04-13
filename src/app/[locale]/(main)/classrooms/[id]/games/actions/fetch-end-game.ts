"use server"
import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { Game } from "@/types"
import { revalidatePath, revalidateTag } from "next/cache"

export async function fetchEndGame(classroomId: string, gameId: string) {
  const url = getAPIServerURL(`/game/end/${gameId}`)
  const { token } = getToken()
  const options: RequestInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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
      revalidatePath(`clasrroms/${classroomId}/games`)
      revalidateTag(`game-classroom-${classroomId}`)
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

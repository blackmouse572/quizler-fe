import { TAPIResult } from "@/app/[locale]/(main)/quizbank/add/actions/add-quiz-bank-classroom-action"
import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { Game } from "@/types"

type Props = {
  gameId: number
}
async function getGameDetailsAction({
  gameId,
}: Props): Promise<TAPIResult<Game>> {
  const token = getToken().token
  const url = getAPIServerURL(`/Game/${gameId}`)
  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["games", `game-${gameId}`],
      revalidate: 1 * 60, // revalidate every 60 seconds
    },
  }
  return fetch(url, options)
    .then(async (res) => {
      const json = await res.json()
      if (!res.ok) {
        throw new Error(json.message)
      }
      return json
    })
    .then((res: Game) => {
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
        data: undefined,
      }
    })
}

export default getGameDetailsAction

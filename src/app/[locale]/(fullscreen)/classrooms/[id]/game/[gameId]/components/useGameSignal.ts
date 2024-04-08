import { useProgress } from "@/app/[locale]/(fullscreen)/classrooms/[id]/game/[gameId]/components/useProgress"
import { useUser } from "@/hooks/useUser"
import { getAPIServerURL } from "@/lib/utils"
import { AnswerHistoryResponse, GameQuiz } from "@/types/game"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr"
import { useCallback, useEffect, useState } from "react"
type GameSignalProp = {
  gameId: number
}
export function useGameSignal({ gameId }: GameSignalProp) {
  const [conn, setConn] = useState<HubConnection | null>(null)
  const [questions, setQuestions] = useState<GameQuiz>()
  const { setTotal, setCurrent } = useProgress()

  const { user } = useUser()
  useEffect(() => {
    if (!user) return
    const connect = () => {
      const conn = new HubConnectionBuilder()
        .withUrl(getAPIServerURL("/gameSocket"), {
          accessTokenFactory: () => user?.accessToken.token!,
          headers: {
            Authorization: `Bearer ${user?.accessToken.token!}`,
            "x-token": user?.accessToken.token!,
          },
        })
        .withAutomaticReconnect()
        .build()

      conn.on("Answer Result", (result: AnswerHistoryResponse) => {
        console.log("Answer Result", result)
      })

      conn.on("Get Quizes", (quizzes: PagedResponse<GameQuiz>) => {
        console.log("Get Quizes", quizzes)
      })

      conn.on("Joined Success", (game: GameQuiz) => {
        console.log("Joined Success", user)
        setQuestions(game)
        setTotal(game.game?.duration ?? 60)
        setCurrent(game.game?.duration ?? 60)
      })

      return conn
    }

    const conn = connect()
    setConn(conn)
  }, [setTotal, user, user?.accessToken.token])

  const start = useCallback(
    (cb: () => void) => {
      if (conn) {
        try {
          conn.start().then(cb)
        } catch (error) {
          throw error
        }
      }
    },
    [conn]
  )

  const leave = useCallback(() => {
    conn?.invoke("LeaveGame")
  }, [conn])

  const connectToGame = useCallback(
    (gameId: number) => {
      return conn?.invoke("JoinGame", gameId)
    },
    [conn]
  )

  const getQuizzes = useCallback(
    (options: Partial<PagedRequest>) => {
      return conn?.invoke("GetQuizes", gameId, options)
    },
    [conn, gameId]
  )

  return { start, leave, connectToGame, conn, getQuizzes, questions }
}

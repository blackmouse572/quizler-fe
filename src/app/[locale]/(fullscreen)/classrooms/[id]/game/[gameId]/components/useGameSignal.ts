import { useUser } from "@/hooks/useUser"
import { getAPIServerURL } from "@/lib/utils"
import { User } from "@/types"
import { AnswerHistoryResponse, GameQuiz } from "@/types/game"
import PagedResponse from "@/types/paged-response"
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr"
import { useCallback, useEffect, useState } from "react"

export function useGameSignal() {
  const [conn, setConn] = useState<HubConnection | null>(null)
  const { user } = useUser()
  useEffect(() => {
    if (!user) return
    console.log("user", user)
    const connect = () => {
      const conn = new HubConnectionBuilder()
        .withUrl(getAPIServerURL("/gameSocket"), {
          accessTokenFactory: () => user?.accessToken.token!,
          headers: {
            "Access-Control-Allow-Origin": "*",
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

      conn.on("Joined Success", (user: User[]) =>
        console.log("Joined Success", user)
      )

      return conn
    }

    const conn = connect()
    setConn(conn)
  }, [user, user?.accessToken.token])

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
      conn?.invoke("JoinGame", gameId)
    },
    [conn]
  )

  return { start, leave, connectToGame }
}

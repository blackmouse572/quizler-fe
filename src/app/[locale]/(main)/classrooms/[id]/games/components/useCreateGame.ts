import { createGameAction } from "@/app/[locale]/(main)/classrooms/[id]/games/actions/create-game-action"
import { AddGameFormType } from "@/app/[locale]/(main)/classrooms/[id]/games/components/add-game-form"
import { queryClient } from "@/app/[locale]/provider"
import { Game } from "@/types"
import PagedResponse from "@/types/paged-response"
import { InfiniteData, useMutation } from "@tanstack/react-query"

type UseCreateGameProps = {
  onError: (e: Error) => void
  onSuccess: (game: Game) => void
  options?: any
  classroomId: string
}
export function useCreateGame({
  onError,
  onSuccess,
  options,
  classroomId,
}: UseCreateGameProps) {
  return useMutation({
    mutationFn: async (payload: AddGameFormType) => {
      const res = await createGameAction(payload)

      if (!res.ok) {
        throw Error(res.message)
      }

      return res.data
    },
    onSettled: (data, error) => {
      if (error) {
        console.error(error)
      }
      if (!data) return
      onSuccess?.(data)
    },
    onError: onError,
  })
}

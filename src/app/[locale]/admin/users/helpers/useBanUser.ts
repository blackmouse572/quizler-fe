import { useMutation } from "@tanstack/react-query"
import banUserAction from "../actions/ban-user-action"

type Props = {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

type Cyka = {
  id: string
}

export function useBanUser({ onSuccess, onError }: Props) {
  return useMutation({
    mutationFn: async ({ id }: Cyka) => {
      const res = await banUserAction({
        id: id,
      })
      if (!res.ok) {
        throw new Error(res.message)
      } else {
        return res.data
      }
    },
    onSettled: (data, error) => {
      if (error) {
        console.error(error)
      }
      onSuccess?.()
    },
    onError,
  })
}

import { useMutation } from "@tanstack/react-query"
import deleteClassroomAction from "../actions/delete-classroom-action"

type Props = {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

type Cyka = {
  id: string
}

export function useDeleteClassroom({ onSuccess, onError }: Props) {
  return useMutation({
    mutationFn: async ({ id }: Cyka) => {
      const res = await deleteClassroomAction({
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

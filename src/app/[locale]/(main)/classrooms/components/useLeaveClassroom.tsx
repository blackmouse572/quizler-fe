import { leaveClassroomAction } from "@/app/[locale]/(main)/classrooms/actions/put-leave-classroom-action"
import { useMutation } from "@tanstack/react-query"
type Props = {
  onSuccess?: (id: string) => void
  onError?: (error: Error) => void
}

type Cyka = {
  id: string
}

export function useLeaveClassroom({ onSuccess, onError }: Props) {
  return useMutation({
    mutationFn: async ({ id }: Cyka) => {
      const res = await leaveClassroomAction(id)
      if (!res.ok) {
        throw new Error(res.message)
      } else {
        return id
      }
    },
    onSettled: (_, error) => {
      if (error) {
        console.error(error)
      }
    },
    onSuccess: (id) => {
      onSuccess?.(id)
    },
    onError,
  })
}

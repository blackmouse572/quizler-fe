import { queryClient } from "@/app/[locale]/provider"
import { useMutation } from "@tanstack/react-query"
import { deleteMemberAction } from "../actions/delete-member-action"

type Props = {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

type Cyka = {
  memberId: string
  classroomId: string
}

export function useKickStudent({ onSuccess, onError }: Props) {
  return useMutation({
    mutationFn: async ({ memberId, classroomId }: Cyka) => {
      const res = await deleteMemberAction({
        memberId: memberId,
        classroomId: classroomId,
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

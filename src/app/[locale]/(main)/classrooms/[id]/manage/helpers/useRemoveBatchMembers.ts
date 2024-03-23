import { useMutation } from "@tanstack/react-query"
import { deleteBatchMemberAction } from "../actions/delete-batch-member-action"

type Props = {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

type Blyat = {
  memberIds: string[]
  classroomId: string
}

export function useRemoveBatchMember({ onSuccess, onError }: Props) {
  return useMutation({
    mutationFn: async ({ memberIds, classroomId }: Blyat) => {
      const res = await deleteBatchMemberAction({
        memberIds: { memberIds },
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

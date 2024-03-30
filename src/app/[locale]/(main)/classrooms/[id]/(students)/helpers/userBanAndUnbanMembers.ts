import { useMutation } from "@tanstack/react-query"
import {
  TBanAPIProps,
  banAndUnbanMemberAction,
} from "../actions/ban-unban-member-action"

type Props = {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export function useBanAndUnbanBatchMember({ onSuccess, onError }: Props) {
  return useMutation({
    mutationFn: async ({ memberIds, classroomId, action }: TBanAPIProps) => {
      const res = await banAndUnbanMemberAction({
        memberIds: memberIds,
        classroomId: classroomId,
        action,
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
      } else {
        onSuccess?.()
      }
    },
    onError,
  })
}

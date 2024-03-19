import { deletePostAction } from "@/app/[locale]/(main)/classrooms/[id]/actions/delete-post-action"
import { queryClient } from "@/app/[locale]/provider"
import { useMutation } from "@tanstack/react-query"

type Props = {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export function useDeletePost({ onSuccess, onError }: Props) {
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deletePostAction(id)
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
      queryClient.invalidateQueries({ queryKey: ["posts"] })
      onSuccess?.()
    },
    onError,
  })
}

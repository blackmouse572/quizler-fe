import { postViewAction } from "@/app/[locale]/(main)/classrooms/[id]/actions/post-view-action"
import { useMutation } from "@tanstack/react-query"

type AddViewProps = {
  classroomId: string
  onSettled?: () => void
  onMutate?: (postId: string) => void
  onError?: (e: Error, postId: string, context: any) => void
}

export function useAddView({
  classroomId,
  onError,
  onSettled,
  onMutate,
}: AddViewProps) {
  return useMutation({
    mutationFn: async (postId: string) => {
      const res = await postViewAction(postId, classroomId)
      if (!res.ok) {
        throw new Error(res.message)
      }
    },
    onSettled,
    onError,
    onMutate,
  })
}

import { useDeleteComment } from "@/app/[locale]/(main)/classrooms/[id]/components/useDeleteComment"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Icons } from "@/components/ui/icons"
import { useToast } from "@/components/ui/use-toast"
import { Post } from "@/types"

import { Comment } from "@/types"
import { DialogProps } from "@radix-ui/react-dialog"
import { useTranslations } from "next-intl"
import { useCallback } from "react"

type Props = {
  post?: Post
  comment?: Comment
} & DialogProps

function DeleteCommentConfirmDialog({
  post,
  comment,
  onOpenChange,
  ...props
}: Props) {
  const t = useTranslations("ClassroomDetails.posts")
  const errorI188n = useTranslations("Errors")
  const { toast } = useToast()
  const handleSuccess = useCallback(() => {
    onOpenChange?.(false)
    toast({
      title: t("comments.action"),
      description: t("comments.delete_success"),
      color: "success",
    })
  }, [onOpenChange, t, toast])
  const handleError = useCallback(
    (e: Error) => {
      toast({
        title: t("comments.action"),
        description: errorI188n(e.message as any),
        color: "danger",
      })
    },
    [errorI188n, t, toast]
  )
  const { mutate, isPending } = useDeleteComment({
    onError: handleError,
    onSuccess: handleSuccess,
    postId: post?.id || "",
  })
  return (
    <AlertDialog onOpenChange={onOpenChange} {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("comments.action")}</AlertDialogTitle>
          <AlertDialogDescription>
            <p>{t("delete.comment_description")}</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("delete.cancel")}</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            autoFocus
            color="danger"
            onClick={() => mutate(comment?.id || "")}
          >
            {isPending && <Icons.Spinner className="animate-spin" />}
            {t("delete.confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteCommentConfirmDialog

import { useDeletePost } from "@/app/[locale]/(main)/classrooms/[id]/components/useDeletePost"
import Preview from "@/components/editor/preview"
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

import { DialogProps } from "@radix-ui/react-dialog"
import { useTranslations } from "next-intl"
import { useCallback } from "react"

type Props = {
  post?: Post
} & DialogProps

function DeletePostConfirmDialog({ post, onOpenChange, ...props }: Props) {
  const t = useTranslations("ClassroomDetails.posts.delete")
  const errorI188n = useTranslations("Errors")
  const { toast } = useToast()
  const handleSuccess = useCallback(() => {
    onOpenChange?.(false)
    toast({
      title: t("title"),
      description: t("success"),
      color: "success",
    })
  }, [onOpenChange, t, toast])
  const handleError = useCallback(
    (e: Error) => {
      toast({
        title: t("title"),
        description: errorI188n(e.message as any),
        color: "danger",
      })
    },
    [errorI188n, t, toast]
  )
  const { mutate, isPending } = useDeletePost({
    onSuccess: handleSuccess,
    onError: handleError,
  })
  return (
    <AlertDialog onOpenChange={onOpenChange} {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("title")}</AlertDialogTitle>
          <AlertDialogDescription>
            <p>{t("description")}</p>
            <Preview
              content={post?.content}
              className="max-h-[20vh] overflow-auto"
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            autoFocus
            onClick={() => mutate(post?.id || "")}
            color="danger"
          >
            {isPending && <Icons.Spinner className="animate-spin" />}
            {t("confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeletePostConfirmDialog

import { useUpdatePost } from "@/app/[locale]/(main)/classrooms/[id]/components/useUpdatePost"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useToast } from "@/components/ui/use-toast"
import { Post } from "@/types"
import { DialogProps } from "@radix-ui/react-dialog"
import { useTranslations } from "next-intl"
import dynamic from "next/dynamic"
import { useCallback, useState } from "react"
type Props = DialogProps & {
  post: Post | null
}
const Editor = dynamic(() => import("@/components/editor/editor"))

function EditPost({ children, post, ...props }: Props) {
  const [content, setContent] = useState(post?.content || "")
  const errorI18n = useTranslations("Errors")
  const { toast } = useToast()
  const t = useTranslations("ClassroomDetails.posts.edit")
  const onError = useCallback(
    (error: Error) => {
      toast({
        title: errorI18n("index"),
        description: errorI18n(error.message as any),
        color: "danger",
      })
    },
    [errorI18n, toast]
  )
  const onSuccess = useCallback(() => {
    props.onOpenChange?.(false)
    toast({
      title: t("title"),
      description: t("success"),
      color: "success",
    })
  }, [props, t, toast])
  const { mutate, isPending } = useUpdatePost({ onError, onSuccess })

  return (
    <Sheet {...props} modal>
      <SheetContent
        className="min-w-[36rem]"
        disabledClose={isPending}
        onInteractOutside={(e) => {
          isPending && e.preventDefault()
        }}
      >
        <SheetHeader>
          <SheetTitle>{t("title")}</SheetTitle>
        </SheetHeader>
        <Editor
          content={post?.content}
          limit={5000}
          onUpdate={(content) => setContent(content.editor.getHTML())}
          editorProps={{
            attributes: {
              class:
                "bg-transparent focus:outline-2 outline-ring outline-offset-2 focus-within:outline-2 min-h-[80vh] border",
            },
          }}
        />
        <SheetFooter>
          <Button
            color="accent"
            onClick={() => props.onOpenChange?.(false)}
            disabled={isPending}
          >
            {t("cancel")}
          </Button>
          <Button
            onClick={() => {
              if (post) {
                mutate({ ...post, content })
              }
            }}
            disabled={isPending || content === post?.content || content === ""}
          >
            {isPending && <Icons.Spinner className="animate-spin" />}
            {t("confirm")}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default EditPost

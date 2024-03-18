"use client"
import { createNewPost } from "@/app/[locale]/(main)/classrooms/[id]/actions/create-post-action"
import { queryClient } from "@/app/[locale]/provider"
import Editor from "@/components/editor/editor"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { NamedToolTip } from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useCallback } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const NewPostSchema = z.object({
  title: z
    .string({
      required_error: "errors.invalid_type_received_undefined",
    })
    .min(3, {
      message: "errors.too_small.string.inclusive",
    })
    .max(255, {
      message: "errors.too_big.string.inclusive",
    }),
  content: z
    .string({
      required_error: "errors.invalid_type_received_undefined",
    })
    .min(3, {
      message: "errors.too_small.string.inclusive",
    })
    .max(5000, {
      message: "errors.too_big.string.inclusive",
    }),
  classroomId: z.number({
    required_error: "errors.invalid_type_received_undefined",
  }),
  gameLink: z.string({}).optional(),
  bankLink: z.string({}).optional(),
})

type Props = {
  initialValues?: Partial<NewPost>
}

export type NewPost = z.infer<typeof NewPostSchema>

function NewPostForm({ initialValues }: Props) {
  const t = useTranslations("ClassroomDetails.posts")
  const errorI18n = useTranslations("Errors")
  const { toast } = useToast()
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: NewPost) => {
      const res = await createNewPost(data)
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
    },
    onError: (error) => {
      toast({
        title: errorI18n("index"),
        description: errorI18n(error.message as any),
        color: "danger",
      })
    },
  })
  const { handleSubmit, setValue } = useForm<NewPost>({
    resolver: zodResolver(NewPostSchema),
    defaultValues: initialValues,
  })

  const onSubmit = useCallback(
    (data: NewPost) => {
      mutate(data)
    },
    [mutate]
  )

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative min-h-32 space-y-2 rounded-lg border border-input bg-background px-4 py-5 shadow-md"
      >
        <Editor
          placeholder={t("placeholder")}
          autofocus
          onUpdate={(e) => {
            const content = e.editor.getHTML()
            setValue("content", content)
          }}
          editable={!isPending}
          editorProps={{
            attributes: {
              class:
                "bg-transparent focus:outline-2 outline-ring outline-offset-2 focus-within:outline-2 min-h-32 border",
            },
          }}
          limit={5000}
        />
        <div className="flex items-center justify-between">
          <div className="space-x-2">
            <NamedToolTip content={t("link-game")}>
              <Button
                isIconOnly
                type="button"
                color="accent"
                variant="ghost"
                disabled={isPending}
              >
                <Icons.Game />
              </Button>
            </NamedToolTip>
            <NamedToolTip content={t("link-quiz")}>
              <Button
                isIconOnly
                type="button"
                color="accent"
                variant="ghost"
                disabled={isPending}
              >
                <Icons.Icon />
              </Button>
            </NamedToolTip>
          </div>
          <NamedToolTip content={t("action")}>
            <Button
              type="submit"
              isIconOnly
              variant="ghost"
              disabled={isPending}
            >
              {isPending ? (
                <Icons.Spinner className="animate-spin" />
              ) : (
                <Icons.Send />
              )}
            </Button>
          </NamedToolTip>
        </div>
      </form>
    </div>
  )
}

export default NewPostForm

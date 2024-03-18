"use client"
import { createNewPost } from "@/app/[locale]/(main)/classrooms/[id]/actions/create-post-action"
import AttachQuizbank from "@/app/[locale]/(main)/classrooms/[id]/components/attach-quizbank"
import { queryClient } from "@/app/[locale]/provider"
import Editor, { RefEditor } from "@/components/editor/editor"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import { NamedToolTip } from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"
import QuizBank from "@/types/QuizBank"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useCallback, useRef, useState } from "react"
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
  const [attachQuizbankOpen, setAttachQuizbankOpen] = useState(false)
  const [selectedQuiz, setSelectedQuiz] = useState<QuizBank>()
  const editorRef = useRef<RefEditor | null>(null)
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
      editorRef.current?.resetContent()
    },
    onError: (error) => {
      toast({
        title: errorI18n("index"),
        description: errorI18n(error.message as any),
        color: "danger",
      })
    },
  })
  const { handleSubmit, setValue, watch } = useForm<NewPost>({
    resolver: zodResolver(NewPostSchema),
    defaultValues: initialValues,
  })

  const renderAttachCard = useCallback(
    (quizbank: QuizBank) => (
      <Card className="relative">
        <CardHeader>
          <CardDescription>
            {t("link-quiz")} ({quizbank.quizCount})
          </CardDescription>
          <CardTitle>{quizbank.bankName}</CardTitle>
          <Button
            isIconOnly
            type="button"
            size="sm"
            color="accent"
            variant="outline"
            className="absolute right-2 top-2"
            onClick={() => {
              setValue("bankLink", "")
              setSelectedQuiz(undefined)
            }}
          >
            <Icons.X />
          </Button>
        </CardHeader>
      </Card>
    ),
    [setValue, t]
  )

  const handleAttachQuizbank = useCallback(
    (quiz: QuizBank) => {
      console.log(quiz)
      setValue("bankLink", quiz.id.toString())
      setValue("title", "posts.post.quizbank")
      setValue("gameLink", "")
      setSelectedQuiz(quiz)
      setAttachQuizbankOpen(false)
    },
    [setValue]
  )

  const handleRemoveAttach = useCallback(() => {
    setValue("bankLink", "")
    setValue("gameLink", "")
    setSelectedQuiz(undefined)
    setValue("title", initialValues?.title ?? "")
  }, [initialValues?.title, setValue])

  const onSubmit = useCallback(
    (data: NewPost) => {
      mutate(data)
    },
    [mutate]
  )

  return (
    <div>
      <AttachQuizbank
        open={attachQuizbankOpen}
        classId={initialValues?.classroomId?.toString() ?? ""}
        onOpenChange={setAttachQuizbankOpen}
        onSelected={handleAttachQuizbank}
        selected={selectedQuiz}
      />
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
        {selectedQuiz && renderAttachCard(selectedQuiz)}
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
                onClick={() => setAttachQuizbankOpen(true)}
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

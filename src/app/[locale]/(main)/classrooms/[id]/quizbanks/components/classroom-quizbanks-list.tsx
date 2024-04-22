"use client"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import QuizBank from "@/types/QuizBank"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"
import { useInView } from "framer-motion"
import { useTranslations } from "next-intl"
import { useCallback, useEffect, useMemo, useRef } from "react"
import { useClassroomQuizbanksList } from "./useClassroomQuizbanksList"
import { deleteQuizBank } from "../actions/detete-quiz-bank"
import { toast } from "@/components/ui/use-toast"
import { queryClient } from "@/app/[locale]/provider"
import QuizbankCard from "@/components/quizbank-card"
import { User } from "@/types"

type Props = {
  classroomId: string
  filter?: Partial<PagedRequest>
  initialData?: PagedResponse<QuizBank>
  user: User
}

export default function ClassroomQuizBanksList(props: Props) {
  const t = useTranslations("ClassroomQuizBank")
  const i18n = useTranslations("Delete_quizbank")
  const errorI18n = useTranslations("Errors")
  const loadmoreRef = useRef<HTMLDivElement>(null)
  const inView = useInView(loadmoreRef)
  const {
    isLoading,
    data,
    isError,
    hasNextPage,
    error,
    refetch,
    fetchNextPage,
  } = useClassroomQuizbanksList({
    ...props,
  })
  const renderLoadingItem = useMemo(() => {
    return <Skeleton className="h-48 w-full bg-white" />
  }, [])
  const renderLoadmore = useMemo(() => {
    return <div id="loadmore" ref={loadmoreRef} />
  }, [])

  const onDeleteQuizBank = useCallback(
    async (itemId: number, deleteSucceedCb: () => void) => {
      const result = await deleteQuizBank(
        props.user.accessToken.token,
        props.classroomId,
        itemId.toString()
      )
      if (!result.ok) {
        return toast({
          title: i18n("message.failed.title"),
          description: errorI18n(result.message as any),
          variant: "flat",
          color: "danger",
        })
      } else {
        deleteSucceedCb()
        queryClient.setQueryData(
          [
            `classroom-${props.classroomId}-quizbanks`,
            props.classroomId,
            props.filter,
          ],
          (oldData: typeof data) => {
            const newData = oldData.pages.map((page) => {
              return {
                ...page,
                data: page?.data.filter((item: any) => item.id !== itemId),
              }
            })
            return {
              pages: newData,
              pageParams: oldData.pageParams,
            }
          }
        )
        return toast({
          title: i18n("message.success.title"),
          description: i18n("message.success.description"),
          variant: "flat",
          color: "success",
        })
      }
    },
    [
      errorI18n,
      i18n,
      props.classroomId,
      props.filter,
      props.user.accessToken.token,
    ]
  )

  const renderItems = useCallback(
    (item: QuizBank) =>
      item.author.id !== props.user.id ? (
        <QuizbankCard
          key={item.id}
          item={item}
          translations={{
            terms: t("terms"),
            delete: t("delete"),
            edit: t("edit"),
            cancel: t("cancel"),
          }}
          onDeleteQuizBank={onDeleteQuizBank}
        />
      ) : (
        <QuizbankCard
          key={item.id}
          item={item}
          translations={{
            terms: t("terms"),
            delete: t("delete"),
            edit: t("edit"),
            cancel: t("cancel"),
          }}
          onDeleteQuizBank={onDeleteQuizBank}
          allowActions
        />
      ),
    [onDeleteQuizBank, props.user.id, t]
  )

  useEffect(() => {
    if (inView && hasNextPage && !isLoading) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, inView, isLoading])

  if (isError) {
    return (
      <div className="space-y-4 text-danger">
        <h3 className="text-lg">{errorI18n("index")}</h3>
        <p>{errorI18n(error?.message as any)}</p>
        <Button onClick={() => refetch()}>{errorI18n("refresh")}</Button>
      </div>
    )
  }
  if (isLoading)
    return (
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 ">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i}>{renderLoadingItem}</div>
        ))}
      </div>
    )
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
      {data?.pages.map((page) => {
        return page?.data.map((item) => renderItems(item))
      })}
      {renderLoadmore}
    </div>
  )
}

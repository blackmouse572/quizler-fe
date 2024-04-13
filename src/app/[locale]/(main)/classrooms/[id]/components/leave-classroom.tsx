"use client"
import LeaveDialogConfirm from "@/app/[locale]/(main)/classrooms/components/leave-classroom-dialog"
import { useLeaveClassroom } from "@/app/[locale]/(main)/classrooms/components/useLeaveClassroom"
import { queryClient } from "@/app/[locale]/provider"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { useToast } from "@/components/ui/use-toast"
import { Classroom } from "@/types"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useState } from "react"

type Props = {
  classroom: Classroom
}
function LeaveClassroom({ classroom }: Props) {
  const [isDelete, setIsDelete] = useState<boolean>(false)
  const t = useTranslations("Classroom")
  const err = useTranslations("Errors")
  const { toast } = useToast()
  const router = useRouter()
  const { mutate, isPending } = useLeaveClassroom({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classrooms"] })
      router.push("/")
    },
    onError: (e) => {
      toast({
        title: err("index"),
        description: err(e.message as any),
        color: "danger",
      })
    },
  })
  return (
    <>
      <LeaveDialogConfirm
        description={t("actions.leave.description")}
        title={t("actions.leave.title", { name: classroom.classname })}
        disabled={isPending}
        isOpen={isDelete}
        onConfirm={() => {
          mutate({ id: classroom.id })
        }}
        onOpenChange={setIsDelete}
        terms={{
          cancel: t("actions.leave.cancel"),
          leave: t("actions.leave.confirm"),
        }}
      />
      <Button
        variant="flat"
        color="accent"
        isIconOnly
        onClick={() => setIsDelete(true)}
      >
        {isPending ? (
          <Icons.Loader className="animate-spin" />
        ) : (
          <Icons.Logout />
        )}
      </Button>
    </>
  )
}

export default LeaveClassroom

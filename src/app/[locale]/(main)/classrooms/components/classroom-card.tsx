import ActionDialogConfirm from "@/components/delete-confirm-dialog"
import LeaveDialogConfirm from "@/app/[locale]/(main)/classrooms/components/leave-classroom-dialog"
import { useLeaveClassroom } from "@/app/[locale]/(main)/classrooms/components/useLeaveClassroom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IIconKeys, Icons } from "@/components/ui/icons"
import { useToast } from "@/components/ui/use-toast"
import UserDisplay from "@/components/user-display"
import { useUser } from "@/hooks/useUser"
import { Classroom, TClassRoomCardRef } from "@/types"
import { useTranslations } from "next-intl"
import Link from "next/link"
import React, { useImperativeHandle, useMemo, useState } from "react"

type Props = {
  item: Classroom
  displayActions?: boolean
  onDeleteClassrooom?: (itemId: number, deleteSucceedCb: () => void) => void
  onLeaveClassroom?: (classroomId: string) => void
}

const ClassroomCard = React.forwardRef<TClassRoomCardRef | null, Props>(
  (
    { item, displayActions, onLeaveClassroom, onDeleteClassrooom }: Props,
    ref
  ) => {
    const i18n = useTranslations("Classroom")
    const [isDelete, setIsDelete] = useState<boolean>(false)
    const [isLeave, setIsLeave] = useState<boolean>(false)
    const { toast } = useToast()
    const err = useTranslations("Errors")
    const { mutate, isPending } = useLeaveClassroom({
      onSuccess: () => {
        onLeaveClassroom?.(item.id)
      },
      onError: (e) => {
        toast({
          title: err("index"),
          description: err(e.message as any),
          color: "danger",
        })
      },
    })
    const user = useUser().user

    useImperativeHandle(ref, () => ({
      setIsDelete,
    }))

    const renderAuthor = useMemo(() => {
      if (item.author == null) return null
      return <UserDisplay user={item.author} />
    }, [item])

    const options = useMemo<
      {
        icon?: IIconKeys
        title: string
        onClick?: () => void
        href?: string
        className?: string
      }[]
    >(
      () =>
        user?.id === item.author?.id
          ? [
              {
                title: i18n("actions.delete.index"),
                icon: "Delete",
                className:
                  "text-destructive hover:bg-destructive/5 hover:text-destructive focus:bg-destructive/5 focus:text-destructive",
                onClick: () => {
                  setIsDelete(true)
                },
              },
              {
                title: i18n("actions.edit.index"),
                icon: "Edit",
                className: "",
                href: `/classrooms/${item.id}/edit`,
              },
            ]
          : [
              {
                title: i18n("actions.leave.index"),
                icon: "Leave",
                className:
                  "text-destructive hover:bg-destructive/5 hover:text-destructive focus:bg-destructive/5 focus:text-destructive",
                onClick: () => {
                  setIsLeave(true)
                },
              },
            ],
      [i18n, item.author?.id, item.id, user?.id]
    )
    const renderOptions = useMemo(() => {
      if (!displayActions) return null
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button isIconOnly variant={"ghost"} color={"accent"}>
              <Icons.DotVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {options.map(({ href, title, icon, onClick, className }) => {
              const Icon = icon ? Icons[icon] : undefined
              if (href)
                return (
                  <DropdownMenuItem key={href} asChild>
                    <Link className={className} href={href}>
                      <>
                        {Icon && <Icon className="mr-2 inline-block h-4 w-4" />}
                        {title}
                      </>
                    </Link>
                  </DropdownMenuItem>
                )
              return (
                <DropdownMenuItem
                  key={title}
                  className={className}
                  onClick={(e) => {
                    e.stopPropagation()
                    onClick?.()
                  }}
                >
                  {Icon && <Icon className="mr-2 inline-block h-4 w-4" />}
                  <span>{title}</span>
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }, [displayActions, options])

    return (
      <Card key={item.id}>
        <Link href={`/classrooms/${item.id}`} className="cursor-pointer">
          <CardHeader className="cursor-pointer">
            <CardTitle>{item.classname}</CardTitle>
            <CardDescription>{item.studentNumber}</CardDescription>
          </CardHeader>
        </Link>
        <CardContent className="flex justify-between">
          {renderAuthor} {renderOptions}
          <ActionDialogConfirm
            description={i18n("actions.delete.description")}
            title={i18n("actions.delete.title", { name: item.classname })}
            terms={{
              cancel: i18n("actions.delete.cancel"),
              action: i18n("actions.delete.confirm"),
            }}
            isOpen={isDelete}
            setOpen={setIsDelete}
            onAction={() => onDeleteClassrooom?.(+item.id, () => {})}
          />
          <LeaveDialogConfirm
            description={i18n("actions.leave.description")}
            title={i18n("actions.leave.title", { name: item.classname })}
            isOpen={isLeave}
            disabled={isPending}
            terms={{
              cancel: i18n("actions.leave.cancel"),
              leave: i18n("actions.leave.confirm"),
            }}
            onOpenChange={setIsLeave}
            onConfirm={() => {
              mutate({ id: item.id })
            }}
          />
        </CardContent>
      </Card>
    )
  }
)

ClassroomCard.displayName = "ClassroomCard"

export default ClassroomCard

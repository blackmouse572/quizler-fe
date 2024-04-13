import ActionDialogConfirm from "@/components/delete-confirm-dialog"
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
import UserDisplay from "@/components/user-display"
import { Classroom, TClassRoomCardRef } from "@/types"
import Link from "next/link"
import React, { useImperativeHandle, useMemo, useState } from "react"

type Props = {
  item: Classroom
  displayActions?: boolean
  onDeleteClassrooom?: (itemId: number, deleteSucceedCb: () => void) => void
}


const ClassroomCard = React.forwardRef<TClassRoomCardRef | null, Props>(
  ({ item, displayActions, onDeleteClassrooom }: Props, ref) => {
    const [isDelete, setIsDelete] = useState<boolean>(false)

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
      () => [
        {
          title: "Delete",
          icon: "Delete",
          className:
            "text-destructive hover:bg-destructive/5 hover:text-destructive focus:bg-destructive/5 focus:text-destructive",
          onClick: () => {
            setIsDelete(true)
          },
        },
      ],
      []
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
            description=""
            title={`Delete classroom '${item.classname}'?`}
            isOpen={isDelete}
            setOpen={setIsDelete}
            onAction={() => onDeleteClassrooom?.(+item.id, () => {})}
          />
        </CardContent>
      </Card>
    )
  }
)

ClassroomCard.displayName = "ClassroomCard"

export default ClassroomCard

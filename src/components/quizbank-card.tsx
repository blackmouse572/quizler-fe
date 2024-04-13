"use client"
import ActionDialogConfirm from "@/components/delete-confirm-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { getShortName } from "@/lib/string-helper"
import { cn } from "@/lib/utils"
import QuizBank from "@/types/QuizBank"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useCallback, useMemo, useState } from "react"

export type QuizbankCardProps = {
  item: QuizBank
  translations?: {
    terms: string
    delete: string
    edit: string
    cancel: string
  }
  onDeleteQuizBank?: (itemId: number, deleteSucceedCb: () => void) => void
  allowActions?: boolean
} & React.HTMLAttributes<HTMLDivElement>

function QuizbankCard({
  item,
  translations,
  className,
  onDeleteQuizBank,
  allowActions,
  ...props
}: QuizbankCardProps) {
  const [isDelete, setIsDelete] = useState(false)
  const [isDeleteing, setIsDeleteing] = useState(false)

  const onDeleteConfirm = useCallback(() => {
    setIsDeleteing(true)
    onDeleteQuizBank?.(item.id, () => {
      setIsDelete(false)
      setIsDeleteing(false)
    })
  }, [item.id, onDeleteQuizBank])

  const router = useRouter()
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
        title: translations?.edit || "Edit",
        icon: "Edit",
        href: `/quizbank/${item.id}/edit`,
      },
      {
        title: translations?.delete || "Delete",
        icon: "Delete",
        className:
          "text-destructive hover:bg-destructive/5 hover:text-destructive focus:bg-destructive/5 focus:text-destructive",
        onClick: () => {
          setIsDelete(true)
        },
      },
    ],
    [item.id, translations?.delete, translations?.edit]
  )
  const renderOptions = useMemo(() => {
    if (!allowActions) return null
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
  }, [allowActions, options])

  return (
    <Card
      className={cn("cursor-pointer hover:bg-accent", className)}
      {...props}
    >
      <CardHeader>
        <Link href={`/quizbank/${item.id}`}>
          <CardTitle>{item.bankName}</CardTitle>
          <CardDescription>
            {item.quizCount} {translations?.terms}
          </CardDescription>
        </Link>
      </CardHeader>
      <CardContent className="flex">
        <div className="flex flex-1 items-center gap-2">
          <Avatar>
            <AvatarFallback>{getShortName(item.author.fullName)}</AvatarFallback>
            <AvatarImage
              src={item.author.avatar || ""}
              alt={item.author.fullName}
            />
          </Avatar>
          <h3 className="text-sm font-bold">{item.author.fullName}</h3>
        </div>
        {renderOptions}
      </CardContent>
      <ActionDialogConfirm
        description=""
        title={translations?.delete || "Delete"}
        terms={{
          cancel: translations?.cancel || "Cancel",
          action: translations?.delete || "Delete",
        }}
        isOpen={isDelete}
        disabled={isDeleteing}
        setOpen={setIsDelete}
        onAction={onDeleteConfirm}
      />
    </Card>
  )
}

export default QuizbankCard

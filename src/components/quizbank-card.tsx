"use client"
import DeleteDialogConfirm from "@/components/delete-confirm-dialog"
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
import { cn } from "@/lib/utils"
import QuizBank from "@/types/QuizBank"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useCallback, useMemo, useState } from "react"

export type QuizbankCardProps = {
  item: QuizBank
  translations?: {
    terms: string
  }
  onDeleteQuizBank?: (itemId: number, deleteSucceedCb: () => void) => void
} & React.HTMLAttributes<HTMLDivElement>

function QuizbankCard({
  item,
  translations,
  className,
  onDeleteQuizBank,
  ...props
}: QuizbankCardProps) {
  const [isDelete, setIsDelete] = useState(false)
  const router = useRouter()

  const onDeleteSucceed = () => {
    router.refresh()
  }

  const onDelete = async (itemId: number) => {
    setIsDelete(false)
    onDeleteQuizBank?.(itemId, onDeleteSucceed)
  }

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
        title: "Edit",
        icon: "About",
        href: `/quizbank/${item.id}/edit`,
      },
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
    [item.id]
  )
  const renderOptions = useMemo(() => {
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
  }, [options])

  const onQuizBankLick = useCallback(
    (item: QuizBank) => {
      router.push(`quizbank\\${item.id}`)
    },
    [router]
  )

  return (
    <Card
      className={cn("cursor-pointer hover:bg-neutral-50", className)}
      {...props}
      onClick={(e) => onQuizBankLick(item)}
    >
      <Link href={`/quizbank/${item.id}`}>
        <CardHeader>
          <CardTitle>{item.bankName}</CardTitle>
          <CardDescription>
            {item.quizCount} {translations?.terms}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex">
          <div className="flex flex-1 items-center gap-2">
            <Avatar>
              <AvatarFallback>{item.bankName.charAt(0)}</AvatarFallback>
              <AvatarImage
                src={item.author.avatar || ""}
                alt={item.author.fullName}
              />
            </Avatar>
            <h3 className="text-sm font-bold">{item.author.fullName}</h3>
          </div>
          {renderOptions}
          <DeleteDialogConfirm
            description=""
            title="Delete Quiz Bank"
            isOpen={isDelete}
            setOpen={setIsDelete}
            onDelete={() => onDelete(item.id)}
          />
        </CardContent>
      </Link>
    </Card>
  )
}

export default QuizbankCard

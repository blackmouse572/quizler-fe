"use client"
import { getClassroomInviteCodeAction } from "@/app/[locale]/(main)/classrooms/actions/get-classroom-code-action"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Icons } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { getAbsoluteURL } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useCallback, useEffect, useMemo, useState } from "react"
import { z } from "zod"

type Props = {
  classroomId: string
}

async function getClassroomInviteCodeFetch(classroomId: string) {
  const res = await getClassroomInviteCodeAction(classroomId)
  if (!res.ok) {
    throw new Error(res.message)
  }
  return res
}

function GenerateJoinDialog({ classroomId }: Props) {
  const { isLoading, data, error, isError, refetch } = useQuery({
    queryKey: ["classroom", classroomId],
    queryFn: () => {
      return getClassroomInviteCodeFetch(classroomId)
    },
  })
  const t = useTranslations("Invite_classroom")
  const { toast } = useToast()
  const [isURLCopied, setIsURLCopied] = useState(false)
  const [isCodeCopied, setIsCodeCopied] = useState(false)

  useEffect(() => {
    let timount: NodeJS.Timeout

    if (isURLCopied) {
      timount = setTimeout(() => {
        setIsURLCopied(false)
      }, 3000)
    }

    if (isCodeCopied) {
      timount = setTimeout(() => {
        setIsCodeCopied(false)
      }, 3000)
    }

    return () => {
      clearTimeout(timount)
    }
  }, [isCodeCopied, isURLCopied])

  const copy = useCallback(
    (value: string) => {
      navigator.clipboard.writeText(value)
      try {
        z.string().url().parse(value)
        setIsURLCopied(true)
        toast({
          title: t("toast_link.title"),
          description: t("toast_link.description"),
        })
      } catch {
        setIsCodeCopied(true)
        toast({
          title: t("toast_code.title"),
          description: t("toast_code.description"),
        })
      }
    },
    [t, toast]
  )
  const buttonLink = useMemo(() => {
    return (
      <Button
        size="sm"
        variant="flat"
        color="accent"
        isIconOnly
        className="-mr-2"
        onClick={() => copy("https://www.google.com")}
      >
        {isURLCopied ? <Icons.Checked /> : <Icons.Copy />}
      </Button>
    )
  }, [copy, isURLCopied])

  const buttonCode = useMemo(() => {
    return (
      <Button
        size="sm"
        variant="flat"
        color="accent"
        isIconOnly
        className="-mr-2"
        onClick={() => copy(data?.data?.code || "")}
      >
        {isCodeCopied ? <Icons.Checked /> : <Icons.Copy />}
      </Button>
    )
  }, [copy, data?.data?.code, isCodeCopied])

  const renderBody = useMemo(() => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-12 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      )
    }

    if (isError) {
      return (
        <div>
          <p className="text-danger-500">{error?.message}</p>
          <Button className="mt-4" onClick={() => refetch()}>
            <Icons.Refresh />
          </Button>
        </div>
      )
    }

    const code = data?.data?.code || ""

    return (
      <div className="space-y-4">
        <div>
          <Label>{t("link")}</Label>
          <Input
            prefix={buttonLink as any}
            value={getAbsoluteURL(`/classrooms?code=${code}`)}
            readOnly
          />
        </div>
        <div>
          <Label>{t("code")}</Label>
          <Input prefix={buttonCode as any} readOnly value={code} />
        </div>
      </div>
    )
  }, [
    buttonCode,
    buttonLink,
    data?.data?.code,
    error?.message,
    isError,
    isLoading,
    refetch,
    t,
  ])

  return (
    <Dialog defaultOpen>
      <DialogTrigger asChild>
        <Button variant="outline" isIconOnly>
          <Icons.School />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>
        {renderBody}
      </DialogContent>
    </Dialog>
  )
}

export default GenerateJoinDialog

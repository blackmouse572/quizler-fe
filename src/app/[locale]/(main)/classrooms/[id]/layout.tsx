import LeaveClassroom from "@/app/[locale]/(main)/classrooms/[id]/components/leave-classroom"
import SideMenu from "@/app/[locale]/(main)/profile/components/side-menu"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { Separator } from "@/components/ui/separator"
import { getUser } from "@/lib/auth"
import { CLASSROOM_SIDEBAR_ITEMS } from "@/lib/config/navbar-config"
import { siteConfig } from "@/lib/config/siteconfig"
import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import Link from "next/link"
import { notFound } from "next/navigation"
import React from "react"
import getClassroomDetails from "../actions/get-classroom-details-action"
import GenerateJoinDialog from "../components/generate-join-dialog"
import SendInviteDialog from "../components/send-invite-dialog"

type Props = {
  children: React.ReactNode
  params: {
    id: string
  }
}

export async function generateMetadata(props: Props) {
  const data = await getClassroomDetails(props.params.id)

  return {
    title: {
      template: `%s | ${data.data?.classname ?? siteConfig.name}`,
      default: data.data?.classname ?? "",
    },
    description: data.data?.description,
  }
}

async function ClassroomDetailLayout({ children, params }: Props) {
  const msg = await getMessages()
  const user = getUser()
  const t = await getTranslations("ClassroomDetails")
  const data = await getClassroomDetails(params.id)
  if (!data.ok) {
    throw Error(data.message)
  }

  if (!data.data || !user) {
    return notFound()
  }

  return (
    <main className="container mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <NextIntlClientProvider
          messages={_.pick(
            msg,
            "Invite_classroom",
            "Errors",
            "Validations",
            "Classroom"
          )}
        >
          <div className="space-y-1">
            <h1 className="text-4xl font-bold">{data.data.classname}</h1>
            <p className="text-accent-foreground">
              {data.data.studentNumber ?? 0} {t("members")}
            </p>
          </div>
          <div className="flex space-x-2">
            <GenerateJoinDialog classroomId={params.id} />
            <SendInviteDialog classroomId={params.id} />
            {user.id !== data.data.author?.id ? (
              <LeaveClassroom classroom={data.data!} />
            ) : (
              <Link href={`/classrooms/${params.id}/edit`}>
                <Button isIconOnly variant="flat" color="accent">
                  <Icons.Edit />
                </Button>
              </Link>
            )}
          </div>
        </NextIntlClientProvider>
      </div>
      <Separator />
      <NextIntlClientProvider
        messages={_.pick(msg, "ClassroomDetails", "Errors")}
      >
        <SideMenu
          items={CLASSROOM_SIDEBAR_ITEMS(params.id)}
          namespace="ClassroomDetails"
        />
        {children}
      </NextIntlClientProvider>
    </main>
  )
}

export default ClassroomDetailLayout

import logoutAction from "@/components/logout-btn/logout-action"
import { Separator } from "@/components/ui/separator"
import { getUser } from "@/lib/auth"
import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import React from "react"
import getClassroomDetails from "../actions/get-classroom-details-action"
import GenerateJoinDialog from "../components/generate-join-dialog"
import SendInviteDialog from "../components/send-invite-dialog"

type Props = {
  children: React.ReactNode
  params: { id: string }
}

async function ClassroomDetailLayout({ children, params }: Props) {
  const { id } = params
  const messages = await getMessages()
  const t = await getTranslations("ClassroomDetails")
  const user = getUser()
  const { ok, data } = await getClassroomDetails(id)

  if (!ok) {
    return notFound()
  }
  if (!user) {
    return logoutAction()
  }

  return (
    <main className="container mx-auto">
      <NextIntlClientProvider
        messages={_.pick(
          messages,
          "Errors",
          "Classroom_student",
          "Validations",
          "Table",
          "Invite_classroom",
          "ClassroomDetails",
          "Editor"
        )}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-4xl font-bold">{data?.classname}</h3>
            {(data?.isStudentAllowInvite || data?.author.id === user.id) && (
              <div className="space-x-2">
                <GenerateJoinDialog classroomId={id} />
                <SendInviteDialog classroomId={id} />
              </div>
            )}
          </div>
          <p>
            {data?.studentNumber}&nbsp;{t("members")}
          </p>
          <Separator className="h-1 rounded-full [mask-image:radial-gradient(ellipse_at_center,var(--neutral-200)_70%),transparent_0%]" />
        </div>
        <div>{children}</div>
      </NextIntlClientProvider>
    </main>
  )
}

export default ClassroomDetailLayout

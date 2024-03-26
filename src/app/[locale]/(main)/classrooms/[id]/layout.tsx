import SideMenu from "@/app/[locale]/(main)/profile/components/side-menu"
import { CLASSROOM_SIDEBAR_ITEMS } from "@/lib/config/navbar-config"
import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import React from "react"
import getClassroomDetails from "../actions/get-classroom-details-action"
import GenerateJoinDialog from "../components/generate-join-dialog"
import SendInviteDialog from "../components/send-invite-dialog"
import { notFound } from "next/navigation"
import { Separator } from "@/components/ui/separator"

type Props = {
  children: React.ReactNode
  params: {
    id: string
  }
}

async function ClassroomDetailLayout({ children, params }: Props) {
  const msg = await getMessages()
  const data = await getClassroomDetails(params.id)
  if (!data.ok) {
    throw Error(data.message)
  }

  if (!data.data) {
    return notFound()
  }

  return (
    <main className="container mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-4xl font-bold">{data.data.classname}</h1>
        <NextIntlClientProvider messages={_.pick(msg, "Invite_classroom")}>
          <div className="flex space-x-2">
            <GenerateJoinDialog classroomId={params.id} />
            <SendInviteDialog classroomId={params.id} />
          </div>
        </NextIntlClientProvider>
      </div>
      <Separator />
      <NextIntlClientProvider messages={_.pick(msg, "ClassroomDetails")}>
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

import SideMenu from "@/app/[locale]/(main)/profile/components/side-menu"
import { CLASSROOM_SIDEBAR_ITEMS } from "@/lib/config/navbar-config"
import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
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

async function ClassroomDetailLayout({ children, params }: Props) {
  const msg = await getMessages()
  return (
    <main className="container mx-auto">
      <NextIntlClientProvider messages={_.pick(msg, "ClassroomDetails")}>
        <SideMenu
          items={CLASSROOM_SIDEBAR_ITEMS(params.id)}
          namespace="ClassroomDetails"
        />
      </NextIntlClientProvider>

      {children}
    </main>
  )
}

export default ClassroomDetailLayout

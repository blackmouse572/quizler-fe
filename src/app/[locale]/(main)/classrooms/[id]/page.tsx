import GenerateJoinDialog from "@/app/[locale]/(main)/classrooms/components/generate-join-dialog"
import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"

type Props = {
  params: {
    id: string
  }
}

async function ClassroomDetailsPage({ params }: Props) {
  const { id } = params
  const messages = await getMessages()
  return (
    <NextIntlClientProvider messages={_.pick(messages, "Invite_classroom")}>
      <div>
        <GenerateJoinDialog classroomId={id} />
        Page
      </div>
    </NextIntlClientProvider>
  )
}

export default ClassroomDetailsPage

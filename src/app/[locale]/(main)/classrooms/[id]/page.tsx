import getClassroomDetails from "@/app/[locale]/(main)/classrooms/actions/get-classroom-details-action"
import GenerateJoinDialog from "@/app/[locale]/(main)/classrooms/components/generate-join-dialog"
import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"

type Props = {
  params: {
    id: string
  }
}

async function ClassroomDetailsPage({ params }: Props) {
  const { id } = params
  const messages = await getMessages()
  const { ok, data } = await getClassroomDetails(id)
  if (!ok) {
    return notFound()
  }

  return (
    <NextIntlClientProvider
      messages={_.pick(messages, "Invite_classroom", "Errors")}
    >
      <div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-4xl font-bold">{data?.classname}</h3>
            <GenerateJoinDialog classroomId={id} />
          </div>
          <p>{data?.description}</p>
        </div>
      </div>
    </NextIntlClientProvider>
  )
}

export default ClassroomDetailsPage

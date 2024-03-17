import getClassroomDetails from "@/app/[locale]/(main)/classrooms/actions/get-classroom-details-action"
import GenerateJoinDialog from "@/app/[locale]/(main)/classrooms/components/generate-join-dialog"
import SendInviteDialog from "@/app/[locale]/(main)/classrooms/components/send-invite-dialog"
import { Separator } from "@/components/ui/separator"
import _ from "lodash"
import { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"

type Props = {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params

  const { data } = await getClassroomDetails(id)
  return {
    title: data?.classname,
    description: data?.description,
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
      messages={_.pick(messages, "Invite_classroom", "Errors", "Validations")}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-4xl font-bold">{data?.classname}</h3>
          {data?.isStudentAllowInvite && (
            <div className="space-x-2">
              <GenerateJoinDialog classroomId={id} />
              <SendInviteDialog classroomId={id} />
            </div>
          )}
        </div>
        <p>{data?.studentNumber}</p>
        <Separator className="h-1 rounded-full [mask-image:radial-gradient(ellipse_at_center,var(--neutral-200)_70%),transparent_0%]" />
      </div>
    </NextIntlClientProvider>
  )
}

export default ClassroomDetailsPage

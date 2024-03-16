import ClassroomList from "@/app/[locale]/(main)/classrooms/components/classroom-list"
import JoinClassroomDialog from "@/app/[locale]/(main)/classrooms/components/join-classroom-dialog"
import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { Classroom } from "@/types"
import PagedResponse from "@/types/paged-response"
import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"

type Props = {}

async function getAllClassroom(): Promise<PagedResponse<Classroom>> {
  const token = getToken()

  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.token}`,
    },
  }

  const data = await fetch(getAPIServerURL("/classrooms/getCurrent"), options)
  return await data.json()
}

async function ClassroomPage({}: Props) {
  const msg = await getMessages()
  const classrooms = await getAllClassroom()

  return (
    <NextIntlClientProvider
      messages={_.pick(msg, "Validations", "Join_classroom", "Errors")}
    >
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Classrooms</h1>
        <JoinClassroomDialog />
      </div>
      <ClassroomList initialData={classrooms} filter={{}} />
    </NextIntlClientProvider>
  )
}

export default ClassroomPage

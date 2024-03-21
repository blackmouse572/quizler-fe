import ClassroomList from "@/app/[locale]/(main)/classrooms/components/classroom-list"
import JoinClassroomDialog from "@/app/[locale]/(main)/classrooms/components/join-classroom-dialog"
import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { Classroom } from "@/types"
import PagedResponse from "@/types/paged-response"
import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

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

function validateCode(code: string): boolean {
  return code.length >= 6 && code.length <= 12
}

async function ClassroomPage({ searchParams }: Props) {
  const msg = await getMessages()
  const classrooms = await getAllClassroom()
  const initCode = searchParams["code"] as string | undefined

  return (
    <NextIntlClientProvider
      messages={_.pick(msg, "Validations", "Join_classroom", "Errors", "Delete_classroom")}
    >
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Classrooms</h1>
        <JoinClassroomDialog defaultOpen={!!initCode} defaultValue={initCode} />
      </div>
      <ClassroomList initialData={classrooms} filter={{}} />
    </NextIntlClientProvider>
  )
}

export default ClassroomPage

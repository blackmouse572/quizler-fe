import JoinClassroomDialog from "@/app/[locale]/(main)/classrooms/components/join-classroom-dialog"
import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import { Classroom } from "@/types"
import PagedResponse from "@/types/paged-response"
import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import Link from "next/link"

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
      messages={_.pick(msg, "Validations", "Join_classroom", "Errors")}
    >
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Classrooms</h1>
        <JoinClassroomDialog defaultOpen={!!initCode} defaultValue={initCode} />
      </div>
      <div className="grid grid-cols-4 gap-3">
        {classrooms.data.map((classroom: Classroom, index: number) => {
          return (
            <Link
              href={`/classrooms/${classroom.id}`}
              key={index}
              className="rounded-md border border-border bg-background px-4 py-6 text-foreground hover:bg-muted"
            >
              <h3 className="text-lg font-bold">{classroom.classname}</h3>
              <p className="line-clamp-2 text-sm text-neutral-500">
                {classroom.description}
              </p>
            </Link>
          )
        })}
      </div>
    </NextIntlClientProvider>
  )
}

export default ClassroomPage

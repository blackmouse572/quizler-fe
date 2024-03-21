import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { getToken, getUser } from "@/lib/auth"
import { notFound } from "next/navigation"
import getAllMembers from "./actions/get-all-members-action"
import { ClassroomMembersTable } from "./components/data-table"

type Props = {
  params: {
    id: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({
    locale,
    namespace: "ManageClassroomMembers.metadata",
  })

  return {
    title: t("title"),
    description: t("description"),
  }
}

export default async function ManageClassroomPage({
  params,
  searchParams,
}: Props) {
  const msg = await getMessages()
  const { id } = params
  const { token } = getToken()
  const user = getUser()

  const take = searchParams.take ? parseInt(searchParams.take as string) : 20
  const skip = searchParams.skip ? parseInt(searchParams.skip as string) : 0
  const search = searchParams.search
    ? encodeURIComponent(searchParams.search as string)
    : undefined
  const options = { take, skip, search }
  const data = await getAllMembers(id, options)

  // const isAuthor = user?.role === "User" && user?.email === data

  // {
  //   ;(!token || !isAuthor) && notFound()
  // }

  return (
    <NextIntlClientProvider
      messages={_.pick(msg, "Validations", "Join_classroom", "Table", "Members_classroom", "Errors")}
    >
      <div className="container">
        <div className="relative mt-5 flex w-[658px] max-w-full justify-between gap-5 self-center pr-2.5 max-md:flex-wrap">
          <div className="flex flex-col">
            <div className="text-2xl font-bold leading-9 text-black">
              VND: Viettnam Dong
            </div>
            <div className="text-lg font-medium leading-8 text-neutral-400">
              123 students
            </div>
          </div>
        </div>
        <div className="border-t-2 border-zinc-400"></div>
        <ClassroomMembersTable data={data} params={params} />
      </div>
    </NextIntlClientProvider>
  )
}
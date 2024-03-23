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
  const {ok: ok, data: data} = await getAllMembers(id, options)

  if (!ok || !data) {
    return notFound()
  }

  // TODO: check role here
  // const isAuthor = user?.role === "User" && user?.email === data

  // {
  //   ;(!token || !isAuthor) && notFound()
  // }

  return (
    <NextIntlClientProvider
      messages={_.pick(msg, "Validations", "Join_classroom", "Table", "Members_classroom", "Errors")}
    >
      <div className="mt-6 space-y-12">
        <ClassroomMembersTable data={data!} params={params} />
      </div>
    </NextIntlClientProvider>
  )
}

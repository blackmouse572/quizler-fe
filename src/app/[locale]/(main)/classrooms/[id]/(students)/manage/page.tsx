import _ from "lodash"
import { getToken, getUser } from "@/lib/auth"
import { getBanMembers } from "../actions/fetch-classroom-members"
import { getMessages, getTranslations } from "next-intl/server"
import { ClassroomMembersTable } from "../components/data-table"

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
  const { id } = params

  const take = searchParams.take ? parseInt(searchParams.take as string) : 20
  const skip = searchParams.skip ? parseInt(searchParams.skip as string) : 0
  const search = searchParams.search
    ? encodeURIComponent(searchParams.search as string)
    : undefined
  const options = { take, skip, search }
  const data = await getBanMembers(id, options)

  return (
    <div className="mt-6 space-y-12">
      <ClassroomMembersTable data={data!} params={params} />
    </div>
  )
}

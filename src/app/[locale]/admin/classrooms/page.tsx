import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { ClassroomsTable } from "./components/table"
import getAllClassroomsAction from "./actions/get-all-classrooms-action"
import { notFound } from "next/navigation"

type AdminClassroomsProps = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({
    locale,
    namespace: "QuizBankAdmin.metadata",
  })

  return {
    title: t("title"),
    description: t("description"),
  }
}

async function AdminClassroomsPage({ searchParams }: AdminClassroomsProps) {
  const take = searchParams.take ? parseInt(searchParams.take as string) : 20
  const skip = searchParams.skip ? parseInt(searchParams.skip as string) : 0
  const search = searchParams.search
    ? encodeURIComponent(searchParams.search as string)
    : undefined
  const options = { take, skip, search }
  const data = await getAllClassroomsAction({
    filter: options
  })
  const messages = await getMessages()

  if (!data.ok || !data.data) notFound()

  return (
    <div className="">
      <NextIntlClientProvider
        messages={_.pick(messages, "Table", "ClassroomAdmin", "Validations", "Errors")}
      >
        <ClassroomsTable data={data.data} />
      </NextIntlClientProvider>
    </div>
  )
}

export default AdminClassroomsPage

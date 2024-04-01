import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { UserTable } from "./components/table"
import getAllUsersAction from "./actions/get-all-users-action"
import { notFound } from "next/navigation"

type AdminUsersProps = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({
    locale,
    namespace: "UserAdmin.metadata",
  })

  return {
    title: t("title"),
    description: t("description"),
  }
}

export default async function AdminUserPage({ searchParams }: AdminUsersProps) {
  const take = searchParams.take ? parseInt(searchParams.take as string) : 20
  const skip = searchParams.skip ? parseInt(searchParams.skip as string) : 0
  const search = searchParams.search
    ? encodeURIComponent(searchParams.search as string)
    : undefined
  const options = { take, skip, search }
  const data = await getAllUsersAction({ options })
  const messages = await getMessages()

  if (!data.ok || !data.data) notFound()

  return (
    <div className="">
      <NextIntlClientProvider
        messages={_.pick(
          messages,
          "Table",
          "UserAdmin",
          "Validations",
          "Errors"
        )}
      >
        <UserTable data={data.data} />
      </NextIntlClientProvider>
    </div>
  )
}

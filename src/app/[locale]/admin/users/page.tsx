import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { UserTable } from "./components/table"
import getAllUsersAction from "./actions/get-all-users-action"

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

async function AdminUserPage({ searchParams }: AdminUsersProps) {
  const take = searchParams.take ? parseInt(searchParams.take as string) : 20
  const skip = searchParams.skip ? parseInt(searchParams.skip as string) : 0
  const search = searchParams.search
    ? encodeURIComponent(searchParams.search as string)
    : undefined
  const options = { take, skip, search }
  const data = await getAllUsersAction(options)
  const messages = await getMessages()

  return (
    <div className="">
      <NextIntlClientProvider
        messages={_.pick(messages, "Table", "UserAdmin", "Validations")}
      >
        <UserTable data={data.data!} />
      </NextIntlClientProvider>
    </div>
  )
}

export default AdminUserPage
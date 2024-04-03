import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import getAllReportsAction from "./actions/get-all-reports-action"
import { ReportsTable } from "./components/table"

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
    namespace: "ReportAdmin.metadata",
  })

  return {
    title: t("title"),
    description: t("description"),
  }
}

export default async function AdminReportPage({ searchParams }: AdminUsersProps) {
  const take = searchParams.take ? parseInt(searchParams.take as string) : 20
  const skip = searchParams.skip ? parseInt(searchParams.skip as string) : 0
  const search = searchParams.search
    ? encodeURIComponent(searchParams.search as string)
    : undefined
  const options = { take, skip, search }
  const data = await getAllReportsAction({ filter: options })
  const messages = await getMessages()

  if (!data.ok || !data.data) notFound()

  return (
    <div className="">
      <NextIntlClientProvider
        messages={_.pick(
          messages,
          "Table",
          "ReportAdmin",
          "ReportQuizBank",
          "Validations",
          "Errors"
        )}
      >
        <ReportsTable data={data.data} />
      </NextIntlClientProvider>
    </div>
  )
}

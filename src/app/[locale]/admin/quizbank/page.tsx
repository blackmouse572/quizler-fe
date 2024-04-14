import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import getAllQuizBanksAction from "./actions/get-all-quizbanks-action"
import { QuizBankTable } from "./components/table"

type AdminQuizBankProps = {
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

async function AdminQuizBankPage({ searchParams }: AdminQuizBankProps) {
  const take = searchParams.take ? parseInt(searchParams.take as string) : 20
  const skip = searchParams.skip ? parseInt(searchParams.skip as string) : 0
  const search = searchParams.search
    ? encodeURIComponent(searchParams.search as string)
    : undefined
  const options = { take, skip, search }
  const data = await getAllQuizBanksAction({
    filter: options,
  })
  const messages = await getMessages()

  if (!data.ok || !data.data) notFound()

  return (
    <div className="">
      <NextIntlClientProvider
        messages={_.pick(
          messages,
          "Table",
          "QuizBankAdmin",
          "Validations",
          "Errors"
        )}
      >
        <QuizBankTable data={data.data} />
      </NextIntlClientProvider>
    </div>
  )
}

export default AdminQuizBankPage

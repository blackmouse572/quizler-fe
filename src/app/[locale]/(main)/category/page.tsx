import SearchBox from "@/components/searchbox"
import { pick } from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { getQuizBankByTag } from "./actions/get-quizbank-by-tag"
import CategoryQuizBankList from "./components/quizbank-list"
import { notFound } from "next/navigation"

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({
    locale,
    namespace: "CategoryQuizBank.metadata",
  })

  return {
    title: t("title"),
    description: t("description"),
  }
}

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function CategoryQuizBank({ searchParams }: Props) {
  const take = 20
  const skip = 0
  const search = searchParams.search
    ? encodeURIComponent(searchParams.search as string)
    : undefined
  const options = { take, skip, search }
  const tag = searchParams.tag
    ? encodeURIComponent(searchParams.tag as string)
    : undefined
  {
    !tag && notFound()
  }

  const res = await getQuizBankByTag(options, tag)
  if (!res.ok) throw new Error(res.message)

  const messages = await getMessages()
  const t = await getTranslations("CategoryQuizBank")

  return (
    <main>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-bold">
          {t("headers.index", { category: `"${decodeURI(tag!)}"` })}
        </h3>
        <div className="flex items-center gap-2">
          <SearchBox className="bg-background" />
        </div>
      </div>
      <NextIntlClientProvider
        messages={pick(messages, "CategoryQuizBank", "Errors")}
      >
        <CategoryQuizBankList data={res.data!} filter={options} tag={tag!} />
      </NextIntlClientProvider>
    </main>
  )
}

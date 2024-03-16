import SearchBox from "@/components/searchbox"
import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import QuizBank from "@/types/QuizBank"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"
import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import QuizBankCardComp from "./components/quiz-card"

type Props = {}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({
    locale,
    namespace: "MyQuizbanks.metadata",
  })

  return {
    title: t("title"),
    description: t("description"),
  }
}

async function getQuizBank(options: Partial<PagedRequest>) {
  //Convert object to query string
  const params = new URLSearchParams()
  const token = getToken()
  for (const [key, value] of Object.entries(options)) {
    if (value !== undefined) {
      params.set(key, String(value)) // Ensure value is a string
    }
  }
  const option: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: {
      revalidate: 1, // Revalidate every 1 second
    },
  }
  const url = getAPIServerURL("/QuizBank") + "?" + params
  const res: PagedResponse<QuizBank> = await fetch(url, option)
    .then((res) => res.json())
    .catch((err) => {
      console.error(`[ERROR] getQuizBank: ${url} `, err)
      throw new Error(err)
    })
  return res
}
type MyQuizbankProps = {
  searchParams: { [key: string]: string | string[] | undefined }
}
async function MyQuizbankPage({ searchParams }: MyQuizbankProps) {
  const take = searchParams.take ? parseInt(searchParams.take as string) : 20
  const skip = searchParams.skip ? parseInt(searchParams.skip as string) : 0
  const search = searchParams.search
    ? encodeURIComponent(searchParams.search as string)
    : undefined
  const options = { take, skip, search }
  const data = await getQuizBank(options)
  const m = await getMessages()
  const t = await getTranslations("MyQuizbanks")
  const { token } = getToken()

  return (
    <NextIntlClientProvider messages={_.pick(m, "Delete_quizbank", "Errors")}>
      <main>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-bold">{t("headers.index")}</h3>
          <SearchBox className="bg-background" />
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {data.data.map((item) => {
            return (
              <QuizBankCardComp
                item={item}
                key={item.id}
                translations={{
                  terms: t("terms"),
                }}
                token={token}
              >
                {item.bankName}
              </QuizBankCardComp>
            )
          })}
        </div>
      </main>
    </NextIntlClientProvider>
  )
}

export default MyQuizbankPage

import QuizBankList from "@/app/[locale]/(main)/quizbank/components/quizbank-list"
import SearchBox from "@/components/searchbox"
import { getToken } from "@/lib/auth"
import { getAPIServerURL } from "@/lib/utils"
import QuizBank from "@/types/QuizBank"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"
import { pick } from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"

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
      Authorization: `Bearer ${token.token}`,
    },
    next: {
      revalidate: 1, // Revalidate every 1 second
    },
  }
  const url = getAPIServerURL("/QuizBank/GetMyQuizBank?" + params.toString())
  const res = await fetch(url, option)
    .then(async (res) => {
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message)
      }
      return data
    })
    .then((res: PagedResponse<QuizBank>) => ({
      ok: true,
      message: "success",
      data: res,
    }))
    .catch((err) => {
      console.error(`[ERROR] getMyQuizbankAction: `, err.message)
      return {
        ok: false,
        message: err.message,
        data: null,
      }
    })
  return res
}
type MyQuizbankProps = {
  searchParams: { [key: string]: string | string[] | undefined }
}
async function MyQuizbankPage({ searchParams }: MyQuizbankProps) {
  const take = 20
  const skip = 0
  const search = searchParams.search
    ? encodeURIComponent(searchParams.search as string)
    : undefined
  const options = { take, skip, search }
  const data = await getQuizBank(options)
  const m = await getMessages()
  const res = await getQuizBank(options)
  if (!res.ok) throw new Error(res.message)

  const messages = await getMessages()
  const t = await getTranslations("MyQuizbanks")
  const { token } = getToken()

  return (
    <main>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-bold">{t("headers.index")}</h3>
        <SearchBox className="bg-background" />
      </div>
      <NextIntlClientProvider messages={pick(messages, "MyQuizbanks", "Errors", "Delete_quizbank")}>
        <QuizBankList data={res.data!} filter={options} token={token} />
      </NextIntlClientProvider>
    </main>
  )
}

export default MyQuizbankPage

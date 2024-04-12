import QuizBankList from "@/app/[locale]/(main)/quizbank/components/quizbank-list"
import SearchBox from "@/components/searchbox"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { NamedToolTip } from "@/components/ui/tooltip"
import { getToken } from "@/lib/auth"
import { toURLSeachParams } from "@/lib/query"
import { getAPIServerURL } from "@/lib/utils"
import QuizBank from "@/types/QuizBank"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"
import { pick } from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import Link from "next/link"

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
  const params = toURLSeachParams(options)
  const token = getToken()
  const option: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.token}`,
    },
    next: {
      revalidate: 60, // Revalidate every 1 second
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
  const res = await getQuizBank(options)
  if (!res.ok) throw new Error(res.message)

  const messages = await getMessages()
  const t = await getTranslations("MyQuizbanks")
  const { token } = getToken()

  return (
    <main>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-bold">{t("headers.index")}</h3>
        <div className="flex items-center gap-2">
          <SearchBox className="bg-background" />
          <NamedToolTip content={t("add_quizbank")} side="bottom">
            <Link href="/quizbank/add">
              <Button isIconOnly>
                <Icons.Plus />
              </Button>
            </Link>
          </NamedToolTip>
        </div>
      </div>
      <NextIntlClientProvider
        messages={pick(messages, "MyQuizbanks", "Errors", "Delete_quizbank")}
      >
        <QuizBankList data={res.data!} filter={options} token={token} />
      </NextIntlClientProvider>
    </main>
  )
}

export default MyQuizbankPage

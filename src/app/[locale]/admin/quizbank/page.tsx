import { getAPIServerURL } from "@/lib/utils"
import QuizBank from "@/types/QuizBank"
import PagedRequest from "@/types/paged-request"
import PagedResponse from "@/types/paged-response"
import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { QuizBankTable } from "./components/table"

type AdminQuizBankProps = {
  searchParams: { [key: string]: string | string[] | undefined }
}

async function getQuizBank(options: Partial<PagedRequest>) {
  //Convert object to query string
  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(options)) {
    if (value !== undefined) {
      params.set(key, String(value)) // Ensure value is a string
    }
  }
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
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

async function AdminUserPage({ searchParams }: AdminQuizBankProps) {
  const take = searchParams.take ? parseInt(searchParams.take as string) : 20
  const skip = searchParams.skip ? parseInt(searchParams.skip as string) : 0
  const search = searchParams.search
    ? encodeURIComponent(searchParams.search as string)
    : undefined
  const options = { take, skip, search }
  const data = await getQuizBank(options)
  const messages = await getMessages()

  return (
    <div className="">
      <NextIntlClientProvider
        messages={_.pick(messages, "Table", "UserAdmin", "Validations")}
      >
        <QuizBankTable data={data} />
      </NextIntlClientProvider>
    </div>
  )
}

export default AdminUserPage

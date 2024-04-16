import SearchBox from "@/components/searchbox"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { NamedToolTip } from "@/components/ui/tooltip"
import { pick } from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import Link from "next/link"
import getAllClassroomQuizBanksAction from "./actions/get-classroom-quizbanks-action"
import ClassroomQuizBanksList from "./components/classroom-quizbanks-list"
import { getUser } from "@/lib/auth"
import { notFound } from "next/navigation"

type Props = {
  params: {
    id: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata() {
  const t = await getTranslations("ClassroomQuizBank.metadata")

  return {
    title: t("title"),
    description: t("description"),
  }
}

export default async function ClassroomQuizBanks({
  params,
  searchParams,
}: Props) {
  const t = await getTranslations("ClassroomQuizBank")
  const { search } = searchParams
  const data = await getAllClassroomQuizBanksAction({
    classroomId: params.id,
    filter: {
      search: search?.toString(),
    },
  })
  const user = getUser()
  const msg = await getMessages()
  if (!data.ok || !user) notFound()
  return (
    <div>
      <div className="flex items-center justify-between py-5">
        <h1 className="text-lg font-medium">{t("metadata.description")}</h1>
        <div className="flex items-center gap-2">
          <SearchBox className="bg-background" />
          <Link href="quizbanks/add">
            <NamedToolTip side="top" content={t("actions.create.index")}>
              <Button isIconOnly>
                <Icons.Plus className="h-4 w-4" />
              </Button>
            </NamedToolTip>
          </Link>
        </div>
      </div>
      <NextIntlClientProvider
        messages={pick(msg, "ClassroomQuizBank", "Delete_quizbank", "Validations", "Errors")}
      >
        <ClassroomQuizBanksList
          classroomId={params.id}
          initialData={data.data}
          filter={{
            search: search?.toString(),
          }}
          user={user}
        />
      </NextIntlClientProvider>
    </div>
  )
}

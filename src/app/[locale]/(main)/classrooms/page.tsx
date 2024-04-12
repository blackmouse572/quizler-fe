import { fetchMyClassrooms } from "@/app/[locale]/(main)/classrooms/actions/fetch-my-classroom"
import ClassroomList from "@/app/[locale]/(main)/classrooms/components/classroom-list"
import JoinClassroomDialog from "@/app/[locale]/(main)/classrooms/components/join-classroom-dialog"
import SearchBox from "@/components/searchbox"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { NamedToolTip } from "@/components/ui/tooltip"
import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import Link from "next/link"

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata() {
  const t = await getTranslations("Classroom")
  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  }
}
async function ClassroomPage({ searchParams }: Props) {
  const msg = await getMessages()
  const t = await getTranslations("Classroom")
  const initCode = searchParams["code"] as string | undefined
  const search = searchParams["search"] as string | undefined
  const { data, message, ok } = await fetchMyClassrooms({ search, take: 20 })
  if (!ok) {
    throw new Error(message)
  }

  return (
    <NextIntlClientProvider
      messages={_.pick(
        msg,
        "Validations",
        "Join_classroom",
        "Errors",
        "Delete_classroom"
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">{t("metadata.title")}</h1>
        <div className="flex items-center gap-2">
          <SearchBox className="bg-background" />
          <JoinClassroomDialog
            defaultOpen={!!initCode}
            defaultValue={initCode}
            trigger={
              <NamedToolTip side="bottom" content={t("actions.join")}>
                <Button isIconOnly>
                  <Icons.Join />
                </Button>
              </NamedToolTip>
            }
          />
          <Link href="/classrooms/add">
            <NamedToolTip side="bottom" content={t("actions.create")}>
              <Button isIconOnly>
                <Icons.Plus className="h-4 w-4" />
              </Button>
            </NamedToolTip>
          </Link>
        </div>
      </div>
      <ClassroomList initialData={data!} filter={{ search }} />
    </NextIntlClientProvider>
  )
}

export default ClassroomPage

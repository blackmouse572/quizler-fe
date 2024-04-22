import getAllGamesByClassroomAction from "@/app/[locale]/(main)/classrooms/[id]/games/actions/get-game-action"
import AddGameForm from "@/app/[locale]/(main)/classrooms/[id]/games/components/add-game-form"
import GameList from "@/app/[locale]/(main)/classrooms/[id]/games/components/game-list"
import getClassroomDetails from "@/app/[locale]/(main)/classrooms/actions/get-classroom-details-action"
import SearchBox from "@/components/searchbox"
import { getUser } from "@/lib/auth"
import { pick } from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

type Props = {
  params: {
    id: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata() {
  const t = await getTranslations("ClassroomGame.metadata")

  return {
    title: t("title"),
    description: t("description"),
  }
}

async function GamePage({ params, searchParams }: Props) {
  const t = await getTranslations("ClassroomGame")
  const user = getUser()
  const { search } = searchParams
  const [data, classroom] = await Promise.all([
    getAllGamesByClassroomAction({
      classroomId: params.id,
      filter: {
        search: search ? search.toString() : undefined,
      },
    }),
    getClassroomDetails(params.id),
  ])
  const msg = await getMessages()
  if (!data.ok || !classroom.ok) {
    throw Error(data.message)
  }
  if (!user) {
    return notFound()
  }
  return (
    <div>
      <div className="flex items-center justify-between py-5">
        <h1 className="text-lg font-medium">{t("metadata.title")}</h1>
        <div className="flex items-center gap-2">
          <SearchBox className="bg-background" />
          {user.id === classroom.data?.author.id && (
            <NextIntlClientProvider
              messages={pick(msg, "ClassroomGame", "Validations", "Errors")}
            >
              <AddGameForm
                intialValues={{
                  classroomId: params.id,
                  isTest: false,
                }}
              />
            </NextIntlClientProvider>
          )}
        </div>
      </div>
      <NextIntlClientProvider
        messages={pick(msg, "ClassroomGame", "Validations", "Errors")}
      >
        <GameList
          classroomId={params.id}
          initialData={data.data}
          filter={{
            search: search?.toString(),
          }}
        />
      </NextIntlClientProvider>
    </div>
  )
}

export default GamePage

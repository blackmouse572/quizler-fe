import getAllGamesByClassroomAction from "@/app/[locale]/(main)/classrooms/[id]/games/actions/get-game-action"
import AddGameForm from "@/app/[locale]/(main)/classrooms/[id]/games/components/add-game-form"
import GameList from "@/app/[locale]/(main)/classrooms/[id]/games/components/game-list"
import SearchBox from "@/components/searchbox"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { NamedToolTip } from "@/components/ui/tooltip"
import { pick } from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"

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
  const { search } = searchParams
  const data = await getAllGamesByClassroomAction({
    classroomId: params.id,
    filter: {
      search: search?.toString(),
    },
  })
  const msg = await getMessages()
  if (!data.ok) {
    throw Error(data.message)
  }
  return (
    <div>
      <div className="flex items-center justify-between py-5">
        <h1 className="text-lg font-medium">{t("metadata.title")}</h1>
        <div className="flex items-center gap-2">
          <SearchBox className="bg-background" />
          <NextIntlClientProvider
            messages={pick(msg, "ClassroomGame", "Validations", "Errors")}
          >
            <AddGameForm
              intialValues={{
                classroomId: params.id,
              }}
              trigger={
                <NamedToolTip content={t("actions.create.index")}>
                  <Button isIconOnly>
                    <Icons.Plus />
                  </Button>
                </NamedToolTip>
              }
            />
          </NextIntlClientProvider>
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

import SearchBox from "@/components/searchbox"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { getTranslations } from "next-intl/server"
import Link from "next/link"

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
    desctiption: t("description"),
  }
}

async function GamePage({ params, searchParams }: Props) {
  const t = await getTranslations("ClassroomGame")
  return (
    <div>
      <div className="flex items-center justify-between py-5">
        <h1 className="text-lg font-medium">{t("metadata.title")}</h1>
        <div className="flex items-center gap-2">
          <SearchBox className="bg-background" />
          <Link href={`/classrooms/${params.id}/games/new`}>
            <Button isIconOnly>
              <Icons.Plus />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default GamePage

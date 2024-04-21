import _ from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { getToken, getUser } from "@/lib/auth"
import { notFound } from "next/navigation"
import ResultGameStudent from "./components/result-game-student"
import ResultGameTeacher from "./components/result-game-teacher"
import getAllRecordsEndGame from "./components/actions/get-all-records-end-game-action"
import getClassroomDetails from "../../../../actions/get-classroom-details-action"

type Props = {
  params: {
    gameID: string,
    id: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({
    locale,
    namespace: "GameResults.metadata",
  })

  return {
    title: t("title"),
    description: t("description"),
  }
}

export default async function ManageClassroomPage({
  params,
  searchParams,
}: Props) {
  const msg = await getMessages()
  const { gameID } = params
  const { token } = getToken()
  const user = getUser()
  const {data:classroom, ok:classroomOk} = await getClassroomDetails(params.id)

  const take = searchParams.take ? parseInt(searchParams.take as string) : 20
  const skip = searchParams.skip ? parseInt(searchParams.skip as string) : 0
  const search = searchParams.search
    ? encodeURIComponent(searchParams.search as string)
    : undefined
  const options = { take, skip, search }
  const { ok, data } = await getAllRecordsEndGame(gameID, options)

  if (!token || !ok || !classroomOk) {
    notFound()
  }

  const isStudent = classroom?.author.id !== user?.id

  // check if student
  if (isStudent) {
    const studentGameResult = data?.data.find(
      (result) => result.account.id === user?.id
    )
    // ranking student
    const sortedData = data!.data
      .filter((entry) => entry.totalMark !== null)
      .sort((a, b) => b.totalMark - a.totalMark)

    const studentRank =
      sortedData.findIndex((entry) => entry.account.id === user?.id) + 1

    return (
      <NextIntlClientProvider
        messages={_.pick(
          msg,
          "Validations",
          "Join_classroom",
          "Table",
          "GameResults",
          "Errors"
        )}
      >
        <div>
          <ResultGameStudent
            data={data!}
            studentGameResult={studentGameResult!}
            studentRank={studentRank}
          />
        </div>
      </NextIntlClientProvider>
    )
  }

  return (
    <NextIntlClientProvider
      messages={_.pick(
        msg,
        "Validations",
        "Join_classroom",
        "Table",
        "GameResults",
        "Errors"
      )}
    >
      <div>
        <ResultGameTeacher data={data!} params={params} />
      </div>
    </NextIntlClientProvider>
  )
}

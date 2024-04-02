import { getMessages, getTranslations } from "next-intl/server"
import { NextIntlClientProvider } from "next-intl"
import _ from "lodash"
import AdminDashboard from "./components/admin-dashboard-page"
import getAllUsersAction from "../users/actions/get-all-users-action"
import getAllClassroomsAction from "../classrooms/actions/get-all-classrooms-action"
import getAllQuizBanksAction from "../quizbank/actions/get-all-quizbanks-action"
import getAllReportsAction from "./actions/get-all-reports-action"
// export const metadata = {
//   title: "Dashboard",
//   description: "Dashboard page, control your site",
// }

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({
    locale,
    namespace: "QuizBankAdmin.metadata",
  })

  return {
    title: t("title"),
    description: t("description"),
  }
}

type AdminDashboardProps = {
  searchParams: { [key: string]: string | string[] | undefined }
}

async function AdminDashboardPage({ searchParams }: AdminDashboardProps) {
  const take = searchParams.take ? parseInt(searchParams.take as string) : 20
  const skip = searchParams.skip ? parseInt(searchParams.skip as string) : 0
  const search = searchParams.search
    ? encodeURIComponent(searchParams.search as string)
    : undefined
  const options = { take, skip, search }

  const reportData = await getAllReportsAction({ filter: options })
  const userData = await getAllUsersAction({ options: options })
  const classroomData = await getAllClassroomsAction({ filter: options })
  const quizbankData = await getAllQuizBanksAction({ filter: options })

  const totalCount = {
    totalReport: reportData.data?.metadata.totals,
    totalUser: userData.data?.metadata.totals,
    totalClassrooms: classroomData.data?.metadata.totals,
    totalQuizBanks: quizbankData.data?.metadata.totals,
  }

  const messages = await getMessages()

  return (
    <div className="">
      <NextIntlClientProvider
        messages={_.pick(
          messages,
          "Table",
          "QuizBankAdmin",
          "Validations",
          "Errors"
        )}
      >
        <AdminDashboard totalCount={totalCount!} />
      </NextIntlClientProvider>
    </div>
  )
}

export default AdminDashboardPage

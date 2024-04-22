import { getMessages, getTranslations } from "next-intl/server"
import { NextIntlClientProvider } from "next-intl"
import _ from "lodash"
import AdminDashboard from "./components/admin-dashboard-page"
import getAllUsersAction from "../users/actions/get-all-users-action"
import getAllClassroomsAction from "../classrooms/actions/get-all-classrooms-action"
import getAllQuizBanksAction from "../quizbank/actions/get-all-quizbanks-action"
import getAllReportsAction from "../reports/actions/get-all-reports-action"
import getAllTransactionsByYearAction from "./actions/get-all-transaction-by-year-action"
import getAllNotificationsAction from "./actions/get-all-notification-action"
import { notFound } from "next/navigation"

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({
    locale,
    namespace: "DashboardAdmin.metadata",
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
  const time = {
    year: 2024,
  }

  const [
    reportData,
    userData,
    classroomData,
    quizbankData,
    transactionData,
    notificationData,
  ] = await Promise.all([
    getAllReportsAction({ filter: options }),
    getAllUsersAction({ options: options }),
    getAllClassroomsAction({ filter: options }),
    getAllQuizBanksAction({ filter: options }),
    getAllTransactionsByYearAction({ year: time.year }),
    getAllNotificationsAction({ filter: options }),
  ])

  const isOk =
    reportData.ok &&
    userData.ok &&
    classroomData.ok &&
    quizbankData.ok &&
    transactionData.ok &&
    notificationData.ok
  const isDataOk =
    reportData.data &&
    userData.data &&
    classroomData.data &&
    quizbankData.data &&
    transactionData.data &&
    notificationData.data

  if (!isOk || !isDataOk) notFound()

  const totalCount = {
    totalReport: reportData.data.metadata.totals,
    totalUser: userData.data.metadata.totals,
    totalClassrooms: classroomData.data.metadata.totals,
    totalQuizBanks: quizbankData.data.metadata.totals,
  }

  const messages = await getMessages()

  return (
    <div className="">
      <NextIntlClientProvider
        messages={_.pick(messages, "Table", "Notification", "DashboardAdmin", "Settings")}
      >
        <AdminDashboard
          totalCount={totalCount}
          transactionData={transactionData.data}
          time={time}
          notificationData={notificationData.data}
        />
      </NextIntlClientProvider>
    </div>
  )
}

export default AdminDashboardPage

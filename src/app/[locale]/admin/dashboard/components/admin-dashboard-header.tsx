import { useTranslations } from "next-intl"
import { AdminCardHeader } from "./admin-card-header"

type Props = {
  totalCount: {
    totalReport: number
    totalUser: number
    totalClassrooms: number
    totalQuizBanks: number
  }
}

export default function AdminDashboardHeader({ totalCount }: Props) {
  const i18n = useTranslations("DashboardAdmin")

  return (
    <div className="grid grid-cols-2 gap-3 font-semibold text-black max-md:flex-wrap max-md:px-5 lg:grid-cols-4 lg:gap-4">
      <AdminCardHeader
        title={i18n("header_card.unprocessed_reports")}
        href={"/admin/reports"}
        total={totalCount.totalReport}
      />
      <AdminCardHeader
        title={i18n("header_card.total_user")}
        href={"/admin/users"}
        total={totalCount.totalUser}
      />
      <AdminCardHeader
        title={i18n("header_card.classroom")}
        href={"/admin/classrooms"}
        total={totalCount.totalClassrooms}
      />
      <AdminCardHeader
        title={i18n("header_card.total_quizbank")}
        href={"/admin/quizbank"}
        total={totalCount.totalQuizBanks}
      />
    </div>
  )
}

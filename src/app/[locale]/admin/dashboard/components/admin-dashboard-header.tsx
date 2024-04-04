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
  return (
    <div className="flex justify-between gap-5 font-semibold text-black max-md:flex-wrap max-md:px-5">
      <AdminCardHeader
        title="Unprocessed reports"
        href={"/admin/reports"}
        total={totalCount.totalReport}
      />
      <AdminCardHeader
        title="Total users"
        href={"/admin/users"}
        total={totalCount.totalUser}
      />
      <AdminCardHeader
        title="Classroom created"
        href={"/admin/classrooms"}
        total={totalCount.totalClassrooms}
      />
      <AdminCardHeader
        title="Total quizbank"
        href={"/admin/quizbank"}
        total={totalCount.totalQuizBanks}
      />
    </div>
  )
}

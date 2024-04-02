import AdminActivityLogs from "./admin-activity-logs"
import AdminDashboardHeader from "./admin-dashboard-header"
import AdminIncomeChart from "./admin-income-chart"

type Props = {
  totalCount: {
    totalReport?: number
    totalUser?: number
    totalClassrooms?: number
    totalQuizBanks?: number
  }
}

export default function AdminDashboard({ totalCount }: Props) {
  return (
    <div className="flex flex-col rounded-xl pb-20 pt-7">
      <AdminDashboardHeader totalCount={totalCount} />

      <div className="mt-11 w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <AdminIncomeChart />
          <AdminActivityLogs />
        </div>
      </div>
    </div>
  )
}

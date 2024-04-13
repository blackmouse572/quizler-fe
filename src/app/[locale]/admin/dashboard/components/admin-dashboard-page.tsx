import { AdminNotification, Transaction } from "@/types"
import PagedResponse from "@/types/paged-response"
import AdminActivityLogs from "./admin-activity-logs"
import AdminDashboardHeader from "./admin-dashboard-header"
import AdminIncomeChart from "./admin-income-chart"

type Props = {
  totalCount: {
    totalReport: number
    totalUser: number
    totalClassrooms: number
    totalQuizBanks: number
  }
  transactionData: Transaction
  time: {
    year: number
  }
  notificationData: PagedResponse<AdminNotification>
}

export default function AdminDashboard({
  totalCount,
  transactionData,
  time,
  notificationData,
}: Props) {
  return (
    <div className="max-h-screen space-y-8">
      <AdminDashboardHeader totalCount={totalCount} />

      <div className="grid grid-cols-1 gap-0 md:gap-5 lg:grid-cols-2">
        <AdminIncomeChart transactionData={transactionData} time={time} />
        <AdminActivityLogs notificationData={notificationData} />
      </div>
    </div>
  )
}

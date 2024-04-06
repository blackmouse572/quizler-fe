import { AdminNotification, Transaction } from "@/types"
import AdminActivityLogs from "./admin-activity-logs"
import AdminDashboardHeader from "./admin-dashboard-header"
import AdminIncomeChart from "./admin-income-chart"
import PagedResponse from "@/types/paged-response"

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
  notificationData
}: Props) {
  return (
    <div className="flex flex-col rounded-xl pt-7">
      <AdminDashboardHeader totalCount={totalCount} />

      <div className="mt-11 w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <AdminIncomeChart transactionData={transactionData} time={time} />
          <AdminActivityLogs notificationData={notificationData} />
        </div>
      </div>
    </div>
  )
}

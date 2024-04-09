import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Transaction } from "@/types"
import { useTranslations } from "next-intl"
import { PieChartAdminDashboard } from "./chart/pie-chart-admin-dashboard"
import BarChartAdminDashboard from "./chart/bar-chart-admin-dashboard"

type Props = {
  transactionData: Transaction
  time: {
    year: number
  }
}

export function TabsIncomeAdmin({ transactionData, time }: Props) {
  const i18n = useTranslations("DashboardAdmin")

  return (
    <Tabs
      defaultValue="pie_chart"
      className="relative left-1/2 -translate-x-1/2"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="pie_chart">
          {i18n("admin_chart.pie_chart.title")}
        </TabsTrigger>
        <TabsTrigger value="bar_chart">
          {i18n("admin_chart.bar_chart.title")}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="pie_chart">
        <PieChartAdminDashboard data={transactionData} time={time} />
      </TabsContent>
      <TabsContent value="bar_chart">
        <BarChartAdminDashboard data={transactionData} time={time} />
      </TabsContent>
    </Tabs>
  )
}

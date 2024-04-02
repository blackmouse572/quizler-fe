import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import HorizontalChartTeacher from "./chart/horizontal-chart-teacher"
// import { PieChartTeacher } from "./chart/pie-chart-teacher"
import PagedResponse from "@/types/paged-response"
import { useTranslations } from "next-intl"

// type Props = {
//   data: PagedResponse<ClassroomGameResults>
// }

export function TabsIncomeAdmin() {
  const i18n = useTranslations("GameResults")
  
  return (
    <Tabs
      defaultValue="horizontal_chart"
      className="relative left-1/2 -translate-x-1/2"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="pie_chart">{i18n("teacher.pie_chart.title")}</TabsTrigger>
        <TabsTrigger value="horizontal_chart">{i18n("teacher.horizontal_chart.title")}</TabsTrigger>
      </TabsList>
      <TabsContent value="horizontal_chart">
        {/* <HorizontalChartTeacher data={data} /> */}
        casdasdk
      </TabsContent>
      <TabsContent value="pie_chart">
        adasdad
        {/* <PieChartTeacher data={data} /> */}
      </TabsContent>
    </Tabs>
  )
}

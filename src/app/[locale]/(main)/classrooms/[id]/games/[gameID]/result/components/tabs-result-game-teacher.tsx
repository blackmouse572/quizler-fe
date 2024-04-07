import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BubbleChartTeacher } from "./chart/bubble-chart-teacher"
import { PieChartTeacher } from "./chart/pie-chart-teacher"
import { ScatterChartTeacher } from "./chart/scatter-chart-teacher"
import PagedResponse from "@/types/paged-response"
import { ClassroomGameResults } from "@/types"
import { useTranslations } from "next-intl"
import BarChartTeacher from "./chart/bar-chart-teacher"

type Props = {
  data: PagedResponse<ClassroomGameResults>
}

export function TabsResultGameTeacher({ data }: Props) {
  const i18n = useTranslations("GameResults")
  
  return (
    <Tabs
      defaultValue="bar_chart"
      className="relative left-1/2 -translate-x-1/2"
    >
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="bar_chart">{i18n("teacher.bar_chart.title")}</TabsTrigger>
        <TabsTrigger value="bubble_chart">{i18n("teacher.bubble_chart.title")}</TabsTrigger>
        <TabsTrigger value="pie_chart">{i18n("teacher.pie_chart.title")}</TabsTrigger>
        <TabsTrigger value="scatter_chart">{i18n("teacher.scatter_chart.title")}</TabsTrigger>
      </TabsList>
      <TabsContent value="bar_chart">
        <BarChartTeacher data={data} />
      </TabsContent>
      <TabsContent value="bubble_chart">
        <BubbleChartTeacher data={data} />
      </TabsContent>
      <TabsContent value="pie_chart">
        <PieChartTeacher data={data} />
      </TabsContent>
      <TabsContent value="scatter_chart">
        <ScatterChartTeacher data={data} />
      </TabsContent>
    </Tabs>
  )
}

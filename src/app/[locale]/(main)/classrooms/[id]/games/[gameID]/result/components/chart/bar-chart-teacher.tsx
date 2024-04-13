"use client"

import { ClassroomGameResults } from "@/types"
import { DataChart } from "@/types/chart-type"
import PagedResponse from "@/types/paged-response"
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js"
import { useTranslations } from "next-intl"
import { Bar } from "react-chartjs-2"
import { generateRandomColors } from "../helpers/random-color-chart"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type Props = {
  data: PagedResponse<ClassroomGameResults>
}

export default function BarChartTeacher({ data }: Props) {
  const i18n = useTranslations("GameResults")

  const labels = data.data.map((result) => ({
    studentName: result.account.fullName,
    totalMark: result.totalMark,
  }))

  const blyat = labels.map((result) => result.studentName)
  const horizontalChart = labels.reduce((acc, result) => {
    return {
      ...acc,
      [result.studentName]: result.totalMark,
    }
  }, {})

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: i18n("teacher.bar_chart.plugins"),
      },
    },
  }

  const dataChart: DataChart = {
    labels: blyat,
    datasets: [
      {
        label: i18n("teacher.bar_chart.datasets.label"),
        data: horizontalChart,
        backgroundColor: [],
      },
    ],
  }

  // Generate random colors without duplicates
  const colorCount: number = 1
  const randomColors: string[] = generateRandomColors(colorCount)

  // Assign random colors to backgroundColor
  dataChart.datasets[0].backgroundColor = randomColors

  return (
    <>
      <Bar options={options} data={dataChart} />
      <div></div>
      <ul className="w-fit rounded-md border border-input bg-accent px-5 py-3 text-xs">
        <li>{i18n("teacher.bar_chart.x_data")}</li>
        <li>{i18n("teacher.bar_chart.y_data")}</li>
      </ul>
    </>
  )
}

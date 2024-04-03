"use client"

import React from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"
import { ClassroomGameResults } from "@/types"
import PagedResponse from "@/types/paged-response"
import { useTranslations } from "next-intl"
import { PieChart } from "@/types/chart-type"
import { generateRandomColors } from "../helpers/random-color-chart"

ChartJS.register(ArcElement, Tooltip, Legend)

type Props = {
  data: PagedResponse<ClassroomGameResults>
}

// labels: range of mark (for example: max is 20 => ["0-5", "5-10", "10-15", "15-20"])
// data: number of student in each range
export function PieChartAdminDashboard({ data }: Props) {
  const studentsMark = data.data.map((result) => result.totalMark)
  const i18n = useTranslations("GameResults")

  const rangeOfMarks = ["0-5", "5-10", "10-15", "15-20"]

  const pieChartData = rangeOfMarks.map((range) => {
    const [min, max] = range.split("-").map(Number)
    const filtered = studentsMark.filter((mark) => mark >= min && mark <= max)
    const count = filtered.length
    const y = count // Number of students in the range
    return y
  })

  const dataChart: PieChart = {
    labels: rangeOfMarks,
    datasets: [
      {
        label: i18n("teacher.pie_chart.datasets.label"),
        data: pieChartData,
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  }

  // Generate random colors without duplicates
  const colorCount: number = rangeOfMarks.length
  const randomColors: string[] = generateRandomColors(colorCount)

  // Assign random colors to backgroundColor and borderColor
  dataChart.datasets[0].backgroundColor = randomColors
  dataChart.datasets[0].borderColor = randomColors

  return <Pie data={dataChart} />
}

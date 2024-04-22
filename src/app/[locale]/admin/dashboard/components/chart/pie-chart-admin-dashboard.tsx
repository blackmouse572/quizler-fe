"use client"

import { Transaction } from "@/types"
import { PieChart } from "@/types/chart-type"
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js"
import { useTranslations } from "next-intl"
import { Pie } from "react-chartjs-2"
import { generateRandomColors } from "../helpers/random-color-chart"

ChartJS.register(ArcElement, Tooltip, Legend)

type Props = {
  data: Transaction
  time: {
    year: number
  }
}

// labels: range of months in year (for example: year 2024 => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
// data: number of total income in each month
export function PieChartAdminDashboard({ data, time }: Props) {
  const i18n = useTranslations("DashboardAdmin")
  // this is currency / divisionRatio = real currency
  const divisionRatio = 100
  const transactionsCreated = data.map((result) => ({
    month: result.month.toString(),
    amount: result.amount / divisionRatio,
  }))

  const monthsInYear = transactionsCreated.map((result) => result.month)

  const pieChartData = transactionsCreated.map((result) => {
    const y = result.amount // Total of money in the range of month
    return y
  })

  const dataChart: PieChart = {
    labels: monthsInYear,
    datasets: [
      {
        label: i18n("admin_chart.pie_chart.datasets.label"),
        data: pieChartData,
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  }

  // Generate random colors without duplicates
  const colorCount: number = monthsInYear.length
  const randomColors: string[] = generateRandomColors(colorCount)

  // Assign random colors to backgroundColor and borderColor
  dataChart.datasets[0].backgroundColor = randomColors
  dataChart.datasets[0].borderColor = randomColors

  return (
    <Pie
      data={dataChart}
      className="mx-auto aspect-square"
      style={{
        maxWidth: "345px",
        maxHeight: "345px",
      }}
    />
  )
}

"use client"

import { Transaction } from "@/types"
import { DataChart } from "@/types/chart-type"
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
  data: Transaction
  time: {
    year: number
  }
}

// labels contains all months in year: now is 2024:
// months: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', "11", "12"]
// total money: total money of that month
export default function BarChartAdminDashboard({ data, time }: Props) {
  const i18n = useTranslations("DashboardAdmin")

  const labels = data.map((result) => ({
    month: result.month.toString(),
    amount: result.amount,
  }))

  const blyat = labels.map((result) => result.month)
  const barChart = labels.reduce((acc, result) => {
    return {
      ...acc,
      [result.month]: result.amount,
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
        text: i18n("admin_chart.bar_chart.plugins"),
      },
    },
  }

  const dataChart: DataChart = {
    labels: blyat,
    datasets: [
      {
        label: i18n("admin_chart.bar_chart.datasets.label"),
        data: barChart,
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
      <ul className="w-fit rounded-md border border-input bg-accent px-5 py-3 text-xs text-accent-foreground">
        <li> {i18n("admin_chart.bar_chart.x_data")} </li>
        <li> {i18n("admin_chart.bar_chart.y_data")}</li>
      </ul>
    </>
  )
}

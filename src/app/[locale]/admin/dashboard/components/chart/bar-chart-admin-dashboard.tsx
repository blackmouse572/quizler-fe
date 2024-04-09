"use client"

import React from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import { ClassroomGameResults, Transaction } from "@/types"
import PagedResponse from "@/types/paged-response"
import { generateRandomColors } from "../helpers/random-color-chart"
import { useTranslations } from "next-intl"
import { DataChart } from "@/types/chart-type"

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
      <div>
        {i18n("admin_chart.bar_chart.x_data")} <br />
        {i18n("admin_chart.bar_chart.y_data")} <br />
      </div>
    </>
  )
}

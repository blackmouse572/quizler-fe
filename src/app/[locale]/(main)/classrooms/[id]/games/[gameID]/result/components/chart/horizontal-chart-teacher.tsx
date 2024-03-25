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
import { ClassroomGameResults } from "@/types"
import PagedResponse from "@/types/paged-response"
import { generateRandomColors } from "../helpers/random-color-chart"
import { useTranslations } from "next-intl"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type Props = {
  data: PagedResponse<ClassroomGameResults>
}

type DataChart = {
  labels: string[]
  datasets: Dataset[]
}

type Dataset = {
  label: string
  data: {}
  backgroundColor: string[]
}

export default function HorizontalChartTeacher({ data }: Props) {
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
        text: i18n("teacher.horizontal_chart.plugins"),
      },
    },
  }

  const dataChart: DataChart = {
    labels: blyat,
    datasets: [
      {
        label: i18n("teacher.horizontal_chart.datasets.label"),
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
      <div>
        {i18n("teacher.horizontal_chart.x_data")} <br />
        {i18n("teacher.horizontal_chart.y_data")} <br />
      </div>
    </>
  )
}

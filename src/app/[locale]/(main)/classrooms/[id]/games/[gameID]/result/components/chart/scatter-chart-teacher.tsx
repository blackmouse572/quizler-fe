"use client"

import React from "react"
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js"
import { Scatter } from "react-chartjs-2"
import { faker } from "@faker-js/faker"
import { ClassroomGameResults } from "@/types"
import PagedResponse from "@/types/paged-response"
import { generateRandomColors } from "../helpers/random-color-chart"
import { useTranslations } from "next-intl"
import { ScatterChart } from "@/types/chart-type"

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
}

type Props = {
  data: PagedResponse<ClassroomGameResults>
}

// x: midpoint of the mark range
// y: number of student in each range
export function ScatterChartTeacher({ data }: Props) {
  const studentsMark = data.data.map((result) => result.totalMark)
  const i18n = useTranslations("GameResults")

  const rangeOfMarks = ["0-5", "5-10", "10-15", "15-20"]

  const scatterChartData = rangeOfMarks.map((range) => {
    const [min, max] = range.split("-").map(Number)
    const filtered = studentsMark.filter((mark) => mark >= min && mark <= max)
    const count = filtered.length
    const x = (min + max) / 2 // Midpoint of the mark range
    const y = count // Number of students in the range
    return { x, y }
  })

  const dataChart: ScatterChart = {
    datasets: [
      {
        label: i18n("teacher.scatter_chart.datasets.label"),
        data: scatterChartData,
        backgroundColor: [],
      },
    ],
  }

  // Generate random colors without duplicates
  const colorCount: number = rangeOfMarks.length
  const randomColors: string[] = generateRandomColors(colorCount)

  // Assign random colors to backgroundColor
  dataChart.datasets[0].backgroundColor = randomColors

  return (
    <>
      <Scatter options={options} data={dataChart} />
      <div>
        {i18n("teacher.scatter_chart.sample_data")} <br />
        {i18n("teacher.scatter_chart.x_data")} <br />
        {i18n("teacher.scatter_chart.y_data")} <br />
        {i18n("teacher.scatter_chart.default_range")} [0-5, 5-10, 10-15, 15-20]
      </div>
    </>
  )
}

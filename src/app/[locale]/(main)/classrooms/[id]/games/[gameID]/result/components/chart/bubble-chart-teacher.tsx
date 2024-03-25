"use client"

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js"
import { Bubble } from "react-chartjs-2"
import PagedResponse from "@/types/paged-response"
import { ClassroomGameResults } from "@/types"
import { generateRandomColors } from "../helpers/random-color-chart"
import { useTranslations } from "next-intl"

ChartJS.register(LinearScale, PointElement, Tooltip, Legend)

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

type DataChart = {
  datasets: Dataset[]
}

type Dataset = {
  label: string
  data: {
    x: number
    y: number
    r: number
  }[]
  backgroundColor: string[]
}

// This chart contains statistic of totalMark of students in classroom:
// x: Midpoint of the mark range
// y: Percentage of students within the range
// r: Number of students in the range
export function BubbleChartTeacher({ data }: Props) {
  const numberOfQuizzes = data.data[0].game.numberOfQuizzes
  const studentsMark = data.data.map((result) => result.totalMark)
  const i18n = useTranslations("GameResults")

  const rangeOfMarks = ["0-5", "5-10", "10-15", "15-20"]

  const bubbleChartData = rangeOfMarks.map((range) => {
    const [min, max] = range.split("-").map(Number)
    const filtered = studentsMark.filter((mark) => mark >= min && mark <= max)
    const count = filtered.length
    const statistic = count > 0 ? (count / numberOfQuizzes) * 100 : 0 // Percentage of students within the range
    const x = (min + max) / 2 // Midpoint of the mark range
    const y = statistic // Percentage of students within the range
    const r = count // Number of students in the range
    return { x, y, r }
  })

  const dataChart: DataChart = {
    datasets: [
      {
        label: i18n("teacher.bubble_chart.datasets.label"),
        data: bubbleChartData,
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
      <Bubble options={options} data={dataChart} />
      <div>
        {i18n("teacher.bubble_chart.sample_data")} <br />
        {i18n("teacher.bubble_chart.x_data")} <br />
        {i18n("teacher.bubble_chart.y_data")} <br />
        {i18n("teacher.bubble_chart.r_data")} <br />
        {i18n("teacher.bubble_chart.default_range")} [0-5, 5-10, 10-15, 15-20]
      </div>
    </>
  )
}

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
import { useTranslations } from "next-intl"
import PagedResponse from "@/types/paged-response"
import { DataChart } from "@/types/chart-type"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type Props = {
  data: PagedResponse<ClassroomGameResults>
  studentGameResult: ClassroomGameResults
  studentRank: number
}

export function ChartStudents({ data, studentGameResult, studentRank }: Props) {
  const numberOfQuizzes = data.data[0].game.numberOfQuizzes
  const multiplyMark = 10
  const i18n = useTranslations("GameResults")

  const options = {
    plugins: {
      title: {
        display: true,
        text: i18n("students.plugins"),
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  }

  const labels = data.data.map((result) => ({
    studentName: result.account.fullName,
    totalMark: result.totalMark,
  }))

  const blyat = labels.map((result) => result.studentName)

  const stackedChartCorrect = labels.reduce((acc, result) => {
    return {
      ...acc,
      [result.studentName]: result.totalMark,
    }
  }, {})

  const stackedChartTotal = labels.reduce((acc, result) => {
    return {
      ...acc,
      [result.studentName]: numberOfQuizzes - result.totalMark,
    }
  }, {})

  const dataChart: DataChart = {
    labels: blyat,
    datasets: [
      {
        label: i18n("students.datasets.label.correct_answer"),
        data: stackedChartCorrect,
        backgroundColor: ["rgb(75, 192, 192)"],
      },
      {
        label: i18n("students.datasets.label.wrong_or_not_answered"),
        data: stackedChartTotal,
        backgroundColor: ["rgb(255, 99, 132)"],
      },
    ],
  }

  return (
    <>
      <div className="flex max-w-[484px] gap-5 text-black max-md:flex-wrap">
        <div className="flex w-fit shrink-0 grow basis-0 flex-col px-5">
          <div className="text-xl font-semibold leading-8">
            {i18n("students.text.ranking", {
              rank: studentRank,
              count: data.data.length,
            })}
          </div>
          <div className="mt-3 text-base leading-6">
            {i18n("students.text.correct_questions", {
              right: studentGameResult.totalMark,
              total: numberOfQuizzes,
            })}
            <br />
            {i18n("students.text.score", {
              point: studentGameResult.totalMark * multiplyMark,
            })}
          </div>
        </div>
      </div>
      <Bar options={options} data={dataChart} />
    </>
  )
}

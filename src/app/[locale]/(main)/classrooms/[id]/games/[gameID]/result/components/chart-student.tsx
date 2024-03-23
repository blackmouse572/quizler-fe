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
import { faker } from "@faker-js/faker"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Students bar chart",
    },
  },
}

const labels = ["First", "Second", "Third"]

export const data = {
  labels,
  datasets: [
    {
      label: "Students",
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    }
  ],
}

export default function ChartStudents() {
  return (
    <>
      <div className="flex max-w-[484px] gap-5 text-black max-md:flex-wrap">
        <div className="flex w-fit shrink-0 grow basis-0 flex-col px-5">
          <div className="text-xl leading-8 font-semibold">
            You place #13 out of 123 students
          </div>
          <div className="mt-3 text-base leading-6">
            13/43 correct questions
            <br />
            Score 10
          </div>
        </div>
      </div>
      <Bar options={options} data={data} />;
    </>
  )
}

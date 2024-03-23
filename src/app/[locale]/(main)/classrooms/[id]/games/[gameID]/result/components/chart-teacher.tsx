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

export default function ChartTeacher() {
  return (
    <>
      <Bar options={options} data={data} />;
    </>
  )
}

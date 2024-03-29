type DataChart = {
  labels: string[]
  datasets: Dataset[]
}

type BubbleChart = {
  datasets: [
    Omit<Dataset, "data"> & {
      data: BubbleChartData
    },
  ]
}
type PieChart = Omit<DataChart, "datasets"> & {
  datasets: [Omit<Dataset, "data"> & PieChartData]
}
type ScatterChart = {
  datasets: [
    Omit<Dataset, "data"> & {
      data: ScatterChartData
    },
  ]
}

type Dataset = {
  label: string
  data: {}
  backgroundColor: string[]
}

type BubbleChartData = {
  x: number
  y: number
  r: number
}[]

type PieChartData = {
  data: number[]
  borderColor: string[]
  borderWidth: number
}

type ScatterChartData = {
  x: number
  y: number
}[]

export type {
  DataChart,
  BubbleChart,
  Dataset,
  PieChart,
  ScatterChart,
}

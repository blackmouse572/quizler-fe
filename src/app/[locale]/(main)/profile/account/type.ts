export type AccountPlan = {
  id: string
  title: string
  description: string
  duration: string
  amount: number
  currency: string
  features: string[]
  maxStudent: number
  useAICount: number
  isRelease: boolean
  isCurrent: boolean
}

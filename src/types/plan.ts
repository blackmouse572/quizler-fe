export type Plan = {
  id: number
  title: string
  description: string
  duration: string
  amount: number
  currency: string
  features: string[]
  maxStudent: number
  maxClassroom: number
  useAICount: number
  isRelease: boolean
  isCurrent?: boolean
}

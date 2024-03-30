import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { EFormAction } from "@/types"
import { useTranslations } from "next-intl"
import { useCallback, useMemo, useState } from "react"

type Props = {
  onPlanSelection: (planId: string) => void
  action: EFormAction
  defaultPlanId?: string
}

// TODO: Move this to a shared location
type Plan = {
  id: string
  name: string
  description: string
  price: number
  currency: string
  features: string[]
}

const initialPlan = {
  id: '',
  name: '',
  description: '',
  price: 0,
  currency: '',
  features: [],
}

function PlanSelectionForm({ onPlanSelection, action, defaultPlanId }: Props) {
  const t = useTranslations(
    `${
      +action === +EFormAction.Add ? "AddClassroom" : "EditClassroom"
    }.form.plan-form`
  )
  const plans = useMemo<Plan[]>(() => {
    return [
      {
        id: "1",
        name: t("starter.title"),
        description: t("starter.description"),
        price: 0,
        currency: "USD",
        features: [
          t("starter.features.feature1"),
          t("starter.features.feature2"),
          t("starter.features.feature3"),
        ],
      },
      {
        id: "2",
        name: t("premium.title"),
        description: t("premium.description"),
        price: 9.99,
        currency: "USD",
        features: [
          t("premium.features.feature1"),
          t("premium.features.feature2"),
          t("premium.features.feature3"),
        ],
      },
    ]
  }, [t])
  const [selectedPlan, setSelectedPlan] = useState<Plan>(plans.find(plan => plan.id === defaultPlanId) ?? initialPlan)

  const onPlanChange = useCallback(
    (id: string) => {
      setSelectedPlan(plans.filter((i) => i.id === id)[0])
      onPlanSelection(id)
    },
    [onPlanSelection, plans]
  )

  return (
    <div className="flex w-full items-center justify-between gap-2">
      {plans.map((plan) => {
        return (
          <Card
            key={plan.id}
            onClick={() => onPlanChange(plan.id)}
            className={cn("flex-1 cursor-pointer transition-all", {
              "ring-2 ring-emerald-500 ring-offset-2":
                selectedPlan?.id === plan.id,
            })}
            aria-selected={selectedPlan?.id === plan.id}
          >
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-heading text-3xl font-bold">
                <span className="text-7xl">{plan.price}</span> {plan.currency}
              </p>
            </CardContent>
            <CardFooter>
              <ul className="list-inside list-disc text-neutral-500">
                {plan.features.map((feature, index) => {
                  return <li key={index}>{feature}</li>
                })}
              </ul>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}

export default PlanSelectionForm

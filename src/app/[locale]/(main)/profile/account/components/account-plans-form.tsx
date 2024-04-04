import { Button } from "@/components/ui/button"
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
  id: "",
  name: "",
  description: "",
  price: 0,
  currency: "",
  features: [],
}

function AccountPlanSelectionForm({
  onPlanSelection,
  action,
  defaultPlanId,
}: Props) {
  const t = useTranslations("Settings.plan")
  const plans = useMemo<Plan[]>(() => {
    return [
      {
        id: "0",
        name: t("hobby.title"),
        description: t("hobby.description"),
        price: 0,
        currency: "USD",
        features: [
          t("hobby.features.feature1"),
          t("hobby.features.feature2"),
          t("hobby.features.feature3"),
          t("hobby.features.feature4"),
        ],
      },
      {
        id: "1",
        name: t("learner.title"),
        description: t("learner.description"),
        price: 50,
        currency: "USD",
        features: [
          t("learner.features.feature1"),
          t("learner.features.feature2"),
          t("learner.features.feature3"),
        ],
      },
      {
        id: "2",
        name: t("expert.title"),
        description: t("expert.description"),
        price: 100,
        currency: "USD",
        features: [
          t("expert.features.feature1"),
          t("expert.features.feature2"),
          t("expert.features.feature3"),
        ],
      },
    ]
  }, [t])
  const [selectedPlan, setSelectedPlan] = useState<Plan>(
    plans.find((plan) => plan.id === defaultPlanId) ?? initialPlan
  )
  const [availablePlanIds, setAvailablePlanIds] = useState<string[]>(["0"])

  const onPlanChange = useCallback(
    (id: string) => {
      setSelectedPlan(plans.filter((i) => i.id === id)[0])
      onPlanSelection(id)
    },
    [onPlanSelection, plans]
  )

  return (
    <div className="flex w-full items-center justify-between gap-6">
      {plans.map((plan) => {
        return (
          <Card
            key={plan.id}
            onClick={() => onPlanChange(plan.id)}
            className={cn("h-96 flex-1 cursor-pointer transition-all relative", {
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
                <span className="text-gray-500">/months</span>
              </p>
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-5">
              <ul className="list-inside list-disc text-neutral-500">
                {plan.features.map((feature, index) => {
                  return <li key={index}>{feature}</li>
                })}
              </ul>
            </CardFooter>
            {!availablePlanIds.includes(plan.id) && (
              <div className="absolute bottom-10 left-5">
                <Button type="submit">{"Upgrade"}</Button>
              </div>
            )}
          </Card>
        )
      })}
    </div>
  )
}

export default AccountPlanSelectionForm

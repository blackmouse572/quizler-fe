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
import { AccountPlan } from "../type"
import UpgradeDialog from "./upgrade-dialog"

type Props = {
  onPlanSelection: (planId: string) => void
  action: EFormAction
  defaultPlanId?: string
}

const initialPlan: AccountPlan = {
  id: "",
  title: "",
  description: "",
  amount: 0,
  currency: "",
  features: [],
}

function AccountPlanSelectionForm({
  onPlanSelection,
  action,
  defaultPlanId,
}: Props) {
  const t = useTranslations("Settings.plan")
  // TODO: change plans info in the future
  const mockPlans = useMemo(
    () => [
      {
        id: "0",
        title: t("hobby.title"),
        duration: 0,
        description: t("hobby.description"),
        amount: 0,
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
        title: t("learner.title"),
        description: t("learner.description"),
        amount: 50,
        currency: "USD",
        features: [
          t("learner.features.feature1"),
          t("learner.features.feature2"),
          t("learner.features.feature3"),
        ],
      },
      {
        id: "2",
        title: t("expert.title"),
        description: t("expert.description"),
        amount: 100,
        currency: "USD",
        features: [
          t("expert.features.feature1"),
          t("expert.features.feature2"),
          t("expert.features.feature3"),
        ],
      },
    ],
    [t]
  )
  const plans = useMemo<AccountPlan[]>(() => {
    return mockPlans
  }, [mockPlans])
  const [selectedPlan, setSelectedPlan] = useState<AccountPlan>(
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
            onClick={(e) => {
              e.stopPropagation()
              onPlanChange(plan.id)
            }}
            className={cn(
              "relative h-96 flex-1 cursor-pointer transition-all",
              {
                "ring-2 ring-emerald-500 ring-offset-2":
                  selectedPlan?.id === plan.id,
              }
            )}
            aria-selected={selectedPlan?.id === plan.id}
          >
            <CardHeader>
              <CardTitle>{plan.title}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-heading text-3xl font-bold">
                <span className="text-7xl">{plan.amount}</span> {plan.currency}
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
                <UpgradeDialog plan={plan} />
              </div>
            )}
          </Card>
        )
      })}
    </div>
  )
}

export default AccountPlanSelectionForm

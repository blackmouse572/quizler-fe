"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import { cn } from "@/lib/utils"
import { EFormAction, Plan } from "@/types"
import { useFormatter, useTranslations } from "next-intl"
import { useCallback, useState } from "react"
import UpgradeDialog from "./upgrade-dialog"

type Props = {
  action: EFormAction
  plans: Plan[]
}

function AccountPlanSelectionForm({ action, plans }: Props) {
  const t = useTranslations("Settings")
  const seletedIds = plans
    .filter((plan) => plan.isCurrent)
    .map((plan) => plan.id)
  const [selectedPlan, setSelectedPlan] = useState<Plan>(plans[0])
  const format = useFormatter()
  const [availablePlanIds, setAvailablePlanIds] = useState<number[]>(seletedIds)

  const onPlanChange = useCallback(
    (id: number) => {
      setSelectedPlan(plans.filter((i) => i.id === id)[0])
    },
    [plans]
  )

  return (
    <div className="flex w-full items-center justify-between gap-6">
      {plans.map((plan) => {
        return (
          <Card
            key={plan.id}
            onClick={(e) => {
              onPlanChange(plan.id)
            }}
            className={cn(
              "relative h-96 flex-1 cursor-pointer transition-all",

              {
                "bg-emerald-500/20": plan.isCurrent,
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
                <span className="text-4xl">
                  {format.number(plan.amount, {
                    style: "currency",
                    currency: "USD",
                    compactDisplay: "short",
                    localeMatcher: "best fit",
                    maximumFractionDigits: 0,
                  })}
                </span>
                <span className="text-gray-500">
                  /{plan.duration} {t("plans.duration")}
                </span>
              </p>
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-5">
              <ul className="list-inside list-none space-y-3 text-neutral-500">
                <li className="">
                  <span className="flex gap-2">
                    <Icons.Check />
                    {t("plans.plans.maxClassroom", {
                      times: plan.maxClassroom,
                    })}
                  </span>
                </li>

                <li className="">
                  <span className="flex gap-2">
                    <Icons.Check />
                    {t("plans.plans.maxStudent", {
                      times: plan.maxStudent,
                    })}
                  </span>
                </li>
                <li className="">
                  <span className="flex gap-2">
                    <Icons.Check />
                    {t("plans.plans.maxAI", {
                      times: plan.useAICount,
                    })}
                  </span>
                </li>
              </ul>
            </CardFooter>
            {!availablePlanIds.includes(plan.id) && (
              <div className="absolute bottom-6 left-5">
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

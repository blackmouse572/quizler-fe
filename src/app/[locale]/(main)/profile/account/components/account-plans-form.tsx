"use client"

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
import { Icons } from "@/components/ui/icons"

type Props = {
  action: EFormAction
  plans: AccountPlan[]
}

const initialPlan: AccountPlan = {
  id: "",
  title: "",
  description: "",
  amount: 0,
  currency: "",
  duration: "0",
  maxStudent: 0,
  useAICount: 0,
  features: [],
  isRelease: false,
  isCurrent: true,
}

function AccountPlanSelectionForm({ action, plans }: Props) {
  const t = useTranslations("Settings.plans.plans")
  const seletedIds = plans
    .filter((plan) => plan.isCurrent)
    .map((plan) => plan.id)
  const [selectedPlan, setSelectedPlan] = useState<AccountPlan>(
    plans.find((plan) => plan.id === seletedIds[0]) ?? initialPlan
  )

  const [availablePlanIds, setAvailablePlanIds] = useState<string[]>(seletedIds)

  const onPlanChange = useCallback(
    (id: string) => {
      setSelectedPlan(plans.filter((i) => i.id === id)[0])
    },
    [plans]
  )

  const getAmount = (amount: number) => {
    return (amount / 100).toFixed(2)
  }

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
                <span className="text-7xl">{getAmount(plan.amount)}</span>{" "}
                {plan.currency?.toUpperCase() ?? "USD"}
                <span className="text-gray-500">/months</span>
              </p>
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-5">
              <ul className="list-inside list-none text-neutral-500">
                {plan.features?.map((feature, index) => {
                  return (
                    <li className="mt-1" key={index}>
                      <span className="flex gap-2">
                        <Icons.Check />
                        {feature}
                      </span>
                    </li>
                  )
                })}
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

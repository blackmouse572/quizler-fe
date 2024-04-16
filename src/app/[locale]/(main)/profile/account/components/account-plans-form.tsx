"use client"

import CancelSubscription from "@/app/[locale]/(main)/profile/account/components/cancel-sub-dialog"
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
  const [selectedPlan, setSelectedPlan] = useState<Plan>(plans[0])
  const format = useFormatter()
  const currentPlan = plans.filter((plan) => plan.isCurrent)[0]

  // this is currency / divisionRatio = real currency
  const divisionRatio = 100
  const onPlanChange = useCallback(
    (id: number) => {
      setSelectedPlan(plans.filter((i) => i.id === id)[0])
    },
    [plans]
  )

  if (currentPlan.amount === 0) {
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
                  "border border-green-500": plan.isCurrent,
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
                    {format.number(plan.amount / divisionRatio, {
                      style: "currency",
                      currency: "USD",
                      compactDisplay: "short",
                      localeMatcher: "best fit",
                      maximumFractionDigits: 2,
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
              {plan.isCurrent && plan.amount !== 0 ? (
                <div className="absolute bottom-6 left-5">
                  <CancelSubscription plan={plan} />
                </div>
              ) : (
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
  return (
    <div className="grid w-full grid-cols-3 items-center justify-between gap-6">
      <Card
        key={currentPlan.id}
        onClick={(e) => {
          onPlanChange(currentPlan.id)
        }}
        className={cn(
          "relative col-span-2 h-96 flex-1 cursor-pointer transition-all",

          {
            "border border-green-500": currentPlan.isCurrent,
          }
        )}
        aria-selected={selectedPlan?.id === currentPlan.id}
      >
        <CardHeader>
          <CardTitle>{currentPlan.title}</CardTitle>
          <CardDescription>{currentPlan.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-heading text-3xl font-bold">
            <span className="text-4xl">
              {format.number(currentPlan.amount / divisionRatio, {
                style: "currency",
                currency: "USD",
                compactDisplay: "short",
                localeMatcher: "best fit",
                maximumFractionDigits: 2,
              })}
            </span>
            <span className="text-gray-500">
              /{currentPlan.duration} {t("plans.duration")}
            </span>
          </p>
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-5">
          <ul className="list-inside list-none space-y-3 text-neutral-500">
            <li className="">
              <span className="flex gap-2">
                <Icons.Check />
                {t("plans.plans.maxClassroom", {
                  times: currentPlan.maxClassroom,
                })}
              </span>
            </li>

            <li className="">
              <span className="flex gap-2">
                <Icons.Check />
                {t("plans.plans.maxStudent", {
                  times: currentPlan.maxStudent,
                })}
              </span>
            </li>
            <li className="">
              <span className="flex gap-2">
                <Icons.Check />
                {t("plans.plans.maxAI", {
                  times: currentPlan.useAICount,
                })}
              </span>
            </li>
          </ul>
        </CardFooter>
        <div className="absolute bottom-6 left-5">
          <CancelSubscription plan={currentPlan} />
        </div>
      </Card>

      {plans
        .filter((plan) => !plan.isCurrent)
        .map((plan, index) => {
          return (
            <Card
              key={plan.id}
              onClick={(e) => {
                onPlanChange(plan.id)
              }}
              className={cn(
                "relative h-96 flex-1 cursor-pointer transition-all",
                index === 0 || index === 1 ? "col-span-1" : "col-span-2",
                {
                  "border border-green-500": plan.isCurrent,
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
                    {format.number(plan.amount / divisionRatio, {
                      style: "currency",
                      currency: "USD",
                      compactDisplay: "short",
                      localeMatcher: "best fit",
                      maximumFractionDigits: 2,
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
            </Card>
          )
        })}
    </div>
  )
}

export default AccountPlanSelectionForm

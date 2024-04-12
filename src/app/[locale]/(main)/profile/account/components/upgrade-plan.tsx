import { EFormAction } from "@/types"
import AccountPlanSelectionForm from "./account-plans-form"
import { notFound } from "next/navigation"
import { fetchAllPlans } from "../actions/fetch-plans"

const UpgradePlan = async () => {
  const { data: allPlans, ok } = await fetchAllPlans()
  if (!ok) {
    notFound()
  }

  return (
    <div className="w-full space-y-8">
      <div className="w-full gap-5 border-b border-solid border-neutral-400 pb-2.5 max-md:flex-wrap">
        <div className="text-xl font-semibold leading-8 text-black">
          {"Upgrade"}
        </div>
      </div>

      <AccountPlanSelectionForm
        action={EFormAction.None}
        plans={allPlans ?? []}
      />
    </div>
  )
}

export default UpgradePlan

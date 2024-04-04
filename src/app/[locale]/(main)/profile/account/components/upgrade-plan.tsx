"use client"
import { EFormAction } from "@/types"
import AccountPlanSelectionForm from "./account-plans-form"

const UpgradePlan = () => {
  return (
    <div className="w-full space-y-8">
      <div className="w-full gap-5 border-b border-solid border-neutral-400 pb-2.5 max-md:flex-wrap">
        <div className="text-xl font-semibold leading-8 text-black">
          {"Upgrade"}
        </div>
      </div>

      <AccountPlanSelectionForm
        onPlanSelection={(id) => console.log(id)}
        action={EFormAction.None}
      />
    </div>
  )
}

export default UpgradePlan

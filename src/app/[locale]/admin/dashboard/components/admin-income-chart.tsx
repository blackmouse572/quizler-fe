import { Transaction } from "@/types"
import { getTranslations } from "next-intl/server"
import SelectIncomeYear from "./select-income-year"
import { TabsIncomeAdmin } from "./tabs-income-admin"

type Props = {
  transactionData: Transaction
  time: {
    year: number
  }
}

export default async function AdminIncomeChart({
  transactionData,
  time,
}: Props) {
  const i18n = await getTranslations("DashboardAdmin")

  return (
    <div className="">
      <div className="flex w-full grow flex-col rounded-lg border border-solid border-neutral-200 bg-white px-8 pt-5 max-md:mt-5 max-md:max-w-full max-md:px-5">
        <div className="flex pb-5 text-base font-semibold leading-6 text-black max-md:max-w-full">
          <div className="w-full">{i18n("admin_chart.title")}</div>
          <div className="w-fit">
            <SelectIncomeYear />
          </div>
        </div>
        <TabsIncomeAdmin transactionData={transactionData} time={time} />
      </div>
    </div>
  )
}

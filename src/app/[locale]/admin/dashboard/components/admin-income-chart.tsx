import { Transaction } from "@/types"
import { TabsIncomeAdmin } from "./tabs-income-admin"
import { getTranslations } from "next-intl/server"

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
    <div className="flex w-6/12 h-96 flex-col max-md:ml-0 max-md:w-full">
      <div className="flex w-full grow flex-col rounded-lg border border-solid border-neutral-200 bg-white px-8 pt-5 max-md:mt-5 max-md:max-w-full max-md:px-5">
        <div className="text-base font-semibold leading-6 text-black max-md:max-w-full">
          {i18n("admin_chart.title")}
        </div>
        <TabsIncomeAdmin transactionData={transactionData} time={time} />
      </div>
    </div>
  )
}

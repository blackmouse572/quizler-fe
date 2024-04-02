import { TabsIncomeAdmin } from "./tabs-income-admin"

export default async function AdminIncomeChart() {
  return (
    <div className="flex w-6/12 flex-col max-md:ml-0 max-md:w-full">
      <div className="flex w-full grow flex-col rounded-lg border border-solid border-neutral-200 bg-white px-8 pt-5 max-md:mt-5 max-md:max-w-full max-md:px-5">
        <div className="text-base font-semibold leading-6 text-black max-md:max-w-full">
          Income
        </div>

        <TabsIncomeAdmin />
        {/* <div className="mt-2.5 flex gap-5 rounded-md bg-zinc-100 py-1 text-sm font-medium leading-5 max-md:max-w-full max-md:flex-wrap">
          <div className="flex-1 items-center justify-center rounded bg-white px-3 py-1 text-zinc-950 shadow max-md:px-5">
            Pie chart
          </div>
          <div className="my-auto text-zinc-500">Other chart</div>
        </div> */}

        {/* <div className="mt-2.5 justify-between px-9 py-16 max-md:max-w-full max-md:px-5">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex w-6/12 flex-col max-md:ml-0 max-md:w-full">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/123af7ddbbbadcc058feba11dc8a2621026f3980f7283a55370e755c547c11f9?"
                className="aspect-square w-[165px] max-w-full shrink-0 max-md:mt-10"
              />
            </div>
            <div className="ml-5 flex w-6/12 flex-col max-md:ml-0 max-md:w-full">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/123af7ddbbbadcc058feba11dc8a2621026f3980f7283a55370e755c547c11f9?"
                className="aspect-square w-[165px] max-w-full shrink-0 max-md:mt-10"
              />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

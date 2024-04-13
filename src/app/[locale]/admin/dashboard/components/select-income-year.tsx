import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getTranslations } from "next-intl/server"

export default async function SelectIncomeYear() {
  const i18n = await getTranslations("DashboardAdmin")

  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="2024" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{i18n("admin_chart.select_year.index")}</SelectLabel>
          <SelectItem value="2024">2024</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

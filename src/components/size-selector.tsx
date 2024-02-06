import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SelectProps } from "@radix-ui/react-select"
import { useTranslations } from "next-intl"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

type Props = SelectProps

const values = ["10", "20", "50"] as const

function SizeSelector({ ...props }: Props) {
  const tableI18n = useTranslations("Table")

  const router = useRouter()
  const searchParams = useSearchParams()
  const pathName = usePathname()

  function handleChange(value: string) {
    console.log(value)
    const params = new URLSearchParams(searchParams.toString())
    params.set("take", value)
    router.push(pathName + "?" + params.toString())

    props.onValueChange?.(value)
  }

  return (
    <Select {...props} onValueChange={handleChange}>
      <SelectTrigger className="w-fit max-w-[180px]">
        <SelectValue placeholder={tableI18n("take-placeholder")} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {values.map((value) => (
            <SelectItem key={value} value={value}>
              {tableI18n("take-value", {
                count: value,
              })}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default SizeSelector

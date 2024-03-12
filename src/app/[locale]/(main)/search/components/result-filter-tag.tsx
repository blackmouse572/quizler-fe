import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTranslations } from "next-intl"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"

type Props = {
  search: string
}

type SelectProps = {
  paramName: string
  placeholder: string
  options: string[]
}

const SelectWithRouter = ({ paramName, placeholder, options }: SelectProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const [selectedValue, setSelectedValue] = useState(
    searchParams.get(paramName)?.toString()
  )

  const handleChange = (value: string) => {
    setSelectedValue(value)
    router.replace(pathname + "?" + createQueryString(paramName, value))
  }

  return (
    <Select value={selectedValue} onValueChange={handleChange}>
      <SelectTrigger className="w-40">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{placeholder}</SelectLabel>
          {options.map((option: any) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default function ResultFilterTag({ search }: Props) {
  const tSearch = useTranslations("SearchPage")

  return (
    <div className="flex w-full justify-between gap-5 px-0.5 max-md:max-w-full max-md:flex-wrap">
      <div className="flex-auto text-xl font-bold leading-8 text-black">
        {tSearch("results_for")} &quot;{search}&quot;
      </div>

      <div className="flex gap-2.5 whitespace-nowrap text-sm leading-5 text-zinc-500">
        <SelectWithRouter
          paramName={tSearch("filter.take")}
          placeholder={tSearch("filter.take_placeholder")}
          options={["1", "5", "10"]}
        />
        <SelectWithRouter
          paramName={tSearch("filter.skip")}
          placeholder={tSearch("filter.skip_placeholder")}
          options={["1", "5", "10"]}
        />
      </div>
    </div>
  )
}

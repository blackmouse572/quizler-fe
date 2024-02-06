import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Input, InputProps } from "./ui/input"
import { useForm } from "react-hook-form"
import { Icons } from "./ui/icons"

function SearchBox({ className, ...props }: InputProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const { register, handleSubmit } = useForm({
    defaultValues: {
      search: searchParams.get("search"),
    },
  })
  const onSubmit = (data: any) => {
    const search = data.search ? data.search : undefined // remove empty string
    const params = new URLSearchParams(searchParams.toString())
    params.set("search", search)
    router.push(pathname + "?" + params.toString())
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      <div className="relative max-w-2xl items-center ">
        <Icons.Search className="absolute  left-2 top-1/2 h-4  w-4 -translate-y-1/2 " />
        <Input
          type="text"
          placeholder="Search"
          className="focus:border-primary-500 max-w-sm border border-none border-border bg-transparent pl-9 focus:ring-0"
          {...register("search")}
          {...props}
        />
      </div>
    </form>
  )
}

export default SearchBox

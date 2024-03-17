"use client"
import { cn } from "@/lib/utils"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { Icons } from "./ui/icons"
import { Input, InputProps } from "./ui/input"

function SearchBox({ className, ...props }: InputProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const { register, handleSubmit } = useForm({
    defaultValues: {
      search: searchParams.get("search"),
    },
  })
  const onSubmit = (data: { search: string | null }) => {
    let search = data.search || ""
    search = search.trim()

    const params = new URLSearchParams(searchParams.toString())
    if (search === "") {
      params.delete("search")
    } else {
      params.set("search", search)
    }
    router.push(pathname + "?" + params.toString())
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "relative w-fit max-w-2xl items-center rounded-md",
        "border border-input",
        "focus:border-primary-500 focus:ring-0",
        className
      )}
    >
      <Icons.Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 " />
      <Input
        type="text"
        placeholder="Search"
        className="w-full border-none border-transparent bg-transparent pl-9 outline-none ring-transparent ring-offset-transparent focus-within:ring-0 focus:border-none focus:ring-0"
        {...register("search")}
        {...props}
      />
    </form>
  )
}

export default SearchBox

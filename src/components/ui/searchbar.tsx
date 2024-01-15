import * as React from "react"

import { cn } from "@/lib/utils"
import { Input, InputProps } from "./input"
import { Form } from "./form"
import { useForm } from "react-hook-form"

export interface SearchBarProps extends InputProps {}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, type, ...props }, ref) => {
    const form = useForm()
    return (
      <>
        <Form {...form}>
          <Input className={className} type={type} {...props} ref={ref} />)
        </Form>
      </>
    )
  }
)

SearchBar.displayName = "SearchBar"

export { SearchBar }

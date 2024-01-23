import * as React from "react"

import { cn } from "@/lib/utils"
import { Input, InputProps } from "./input"
import { Icons } from "./icons"

export interface SearchBarProps extends InputProps {
  container?: React.ComponentProps<"div">
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ container, className, type, ...props }, ref) => {
    return (
      <div className={cn("relative w-[100%]", container?.className)}>
        <Icons.Search className="absolute inset-y-0 left-3 my-auto h-6 w-6 text-gray-500" />
        <Input
          type="text"
          className={cn("p-6 pl-12 pr-4", className)}
          {...props}
        />
      </div>
    )
  }
)

SearchBar.displayName = "SearchBar"

export { SearchBar }

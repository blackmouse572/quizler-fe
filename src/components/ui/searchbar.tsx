import * as React from "react"

import { cn } from "@/lib/utils"
import { InputProps } from "./input"
import GlobalSearch from "./logged-in-navbar/global-search"

export interface SearchBarProps extends InputProps {
  container?: React.ComponentProps<"div">
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ container, className, type, ...props }, ref) => {
    return (
      <div className={cn("relative w-[100%]", container?.className)}>
        <GlobalSearch className={cn("p-6 pl-12 pr-4", className)} />
      </div>
    )
  }
)

SearchBar.displayName = "SearchBar"

export { SearchBar }

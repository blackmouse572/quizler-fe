import * as React from "react"

import { cn } from "@/lib/utils"
import { InputProps } from "./input"
import GlobalSearch from "./logged-in-navbar/global-search"

export interface SearchBarProps extends InputProps {
  container?: React.ComponentProps<"div">
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ container, className, type, ...props }, ref) => {
    return <GlobalSearch className={cn("min-h-8", className)} {...props} />
  }
)

SearchBar.displayName = "SearchBar"

export { SearchBar }

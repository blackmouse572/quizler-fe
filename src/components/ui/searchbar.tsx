import * as React from "react"

import { cn } from "@/lib/utils"
import { Input, InputProps } from "./input"

export interface SearchBarProps extends InputProps {
  container?: React.ComponentProps<"div">
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ container, className, type, ...props }, ref) => {
    return (
      <div className={cn("relative w-[100%]", container?.className)}>
        <svg
          width="20"
          height="20"
          className="absolute inset-y-0 left-3 my-auto h-6 w-6 text-gray-500"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.5 17.5L13.9166 13.9166M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
            stroke="#18181B"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
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

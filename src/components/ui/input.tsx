import * as React from "react"

import { cn } from "@/lib/utils"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  prefix?: React.ReactNode
}

export type InputRef = HTMLInputElement

const Input = React.forwardRef<InputRef, InputProps>(
  ({ className, type, disabled, readOnly, prefix, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex h-10 items-center rounded-md border border-input bg-background pl-3 text-sm ",
          readOnly || disabled
            ? ""
            : "ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2",
          className
        )}
      >
        {prefix && <div className="mr-2">{prefix}</div>}
        <input
          type={type}
          className="w-full rounded-md bg-transparent p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          ref={ref}
          readOnly={readOnly}
          disabled={disabled}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }

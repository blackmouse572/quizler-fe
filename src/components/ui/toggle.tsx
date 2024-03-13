"use client"

import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-neutral-100 hover:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-neutral-500 data-[state=on]:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-400 dark:focus-visible:ring-neutral-300 dark:data-[state=on]:bg-neutral-800 dark:data-[state=on]:text-neutral-50",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-neutral-200 bg-transparent shadow-sm hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
      },
      size: {
        md: "h-9 px-4 py-2 [&_svg]:h-5 [&_svg]:w-5",
        sm: "h-8 rounded-md px-3 text-xs [&_svg]:h-4 [&_svg]:w-4",
        lg: "h-10 rounded-md px-8 [&_svg]:h-6 [&_svg]:w-6",
      },
      isIconOnly: {
        true: "aspect-square p-0",
        false: "[&_svg]:mr-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      isIconOnly: true,
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }

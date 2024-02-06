"use client"

import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "@radix-ui/react-icons"
import * as React from "react"

import { Icons } from "@/components/ui/icons"
import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"

export const checkboxVariants = cva(
  "group: peer h-4 w-4 shrink-0 rounded-[0.35rem] border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
  {
    variants: {
      size: {
        md: "h-4 w-4 [&_svg]:h-4 [&_svg]:w-4",
        sm: "h-3.5 w-3.5 [&_svg]:h-3.5 [&_svg]:w-3.5",
        lg: "h-[1.125rem] w-[1.125rem] [&_svg]:h-[1.125rem] [&_svg]:w-[1.125rem]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, size, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(checkboxVariants({ size, className }))}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("group flex items-center justify-center text-current")}
    >
      <CheckIcon className="inline-block group-data-[state=indeterminate]:hidden" />
      <Icons.Minus className="hidden group-data-[state=indeterminate]:inline-block" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }

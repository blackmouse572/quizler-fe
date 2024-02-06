import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring active:scale-[98%] active:shadow-none active:ring-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      color: {
        primary:
          "bg-primary text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        accent:
          "bg-accent text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        danger:
          "bg-danger-500 text-danger-50 focus:bg-danger-500 focus:text-danger-50",
        success:
          "bg-success-500 text-success-50 focus:bg-success-500 focus:text-success-50",
        warning:
          "bg-warning-500 text-warning-50 focus:bg-warning-500 focus:text-warning-50",
      },
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        outline:
          "border border-input bg-transparent shadow-sm ring-primary focus:ring-0",
        ghost: "",
        light: "",
        flat: "",
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
      color: "primary",
      isIconOnly: false,
    },
    compoundVariants: [
      //Outline
      {
        color: "primary",
        variant: "outline",
        className:
          "border-primary bg-transparent text-primary hover:bg-primary/20 hover:text-primary focus:bg-primary/30 focus:text-primary-foreground",
      },
      {
        color: "accent",
        variant: "outline",
        className:
          "border-primary/20 text-accent-foreground hover:bg-accent hover:text-primary focus:bg-accent/30 focus:text-accent-foreground",
      },
      {
        color: "danger",
        variant: "outline",
        className:
          "border-danger-500 text-danger-500 hover:bg-transparent hover:text-danger-500 focus:bg-danger-500/20 focus:text-danger-500",
      },
      {
        color: "success",
        variant: "outline",
        className:
          "border-success-500 text-success-500 hover:bg-transparent hover:text-success-500 focus:bg-success-500/20 focus:text-success-500",
      },
      {
        color: "warning",
        variant: "outline",
        className:
          "hover:text-waning-500 border-warning-500 text-warning-500 hover:bg-transparent focus:bg-warning-500/20 focus:text-warning-500",
      },
      //Default
      {
        color: "primary",
        variant: "default",
        className: "bg-primary text-primary-foreground hover:bg-primary/90 ",
      },
      {
        color: "accent",
        variant: "default",
        className: "bg-accent text-accent-foreground hover:bg-accent/90",
      },
      {
        color: "danger",
        variant: "default",
        className: "bg-danger-500 text-danger-50 hover:bg-danger-500/90",
      },
      {
        color: "success",
        variant: "default",
        className: "bg-success-500 text-success-50 hover:bg-success-500/90",
      },
      {
        color: "warning",
        variant: "default",
        className: "bg-warning-500 text-warning-50 hover:bg-warning-500/90",
      },

      //Ghost
      {
        color: "primary",
        variant: "ghost",
        className:
          "border border-primary bg-transparent text-primary hover:bg-primary  hover:text-primary-foreground",
      },
      {
        color: "accent",
        variant: "ghost",
        className:
          "border border-accent bg-transparent text-accent-foreground hover:bg-accent hover:text-accent-foreground",
      },
      {
        color: "danger",
        variant: "ghost",
        className:
          "border border-danger-500 bg-transparent text-danger-500 hover:bg-danger-500 hover:text-danger-50",
      },
      {
        color: "success",
        variant: "ghost",
        className:
          "border border-success-500 bg-transparent text-success-500 hover:bg-success-500 hover:text-success-50",
      },
      {
        color: "warning",
        variant: "ghost",
        className:
          "border border-warning-500 bg-transparent text-warning-500 hover:bg-warning-500 hover:text-warning-50",
      },

      //Light
      {
        color: "primary",
        variant: "light",
        className:
          "bg-transparent text-primary hover:bg-primary/70 hover:text-primary-foreground",
      },
      {
        color: "accent",
        variant: "light",
        className: "bg-transparent text-accent hover:bg-accent/70",
      },
      {
        color: "danger",
        variant: "light",
        className: "bg-transparent text-danger-500 hover:bg-danger-500/20",
      },
      {
        color: "success",
        variant: "light",
        className: "bg-transparent text-success-500 hover:bg-success-500/20",
      },
      {
        color: "warning",
        variant: "light",
        className: "bg-transparent text-warning-500 hover:bg-warning-500/20",
      },

      //Flat
      {
        color: "primary",
        variant: "flat",
        className: "bg-primary/20 text-primary",
      },
      {
        color: "accent",
        variant: "flat",
        className: "bg-accent/20 text-accent-foreground",
      },
      {
        color: "danger",
        variant: "flat",
        className: "bg-danger-500/20 text-danger-500",
      },
      {
        color: "success",
        variant: "flat",
        className: "bg-success-500/20 text-success-500",
      },
      {
        color: "warning",
        variant: "flat",
        className: "bg-warning-500/20 text-warning-500",
      },
    ],
  }
)

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, color, isIconOnly, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className, color, isIconOnly })
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

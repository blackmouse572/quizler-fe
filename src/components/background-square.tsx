import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"
import React from "react"

// TODO: apply mask image style
const backgroundSquareVariants = cva(
  "flex h-screen items-center justify-center bg-grid-xl-slate-300/20",
  {
    variants: {
      variant: {
        default: "",
        topDown:
          "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type TBackgroundSquareProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof backgroundSquareVariants>

const BackgroundSquare = ({
  children,
  className,
  variant,
  ...props
}: TBackgroundSquareProps) => {
  return (
    <div
      className={cn(
        backgroundSquareVariants({variant}),
        className
      )}
      {...props}
    >
      <div className="z-10">{children}</div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-neutral-200 p-28 backdrop-blur-lg [mask-image:radial-gradient(ellipse_at_center,transparent_0%,var(--neutral-200)_70%)] dark:bg-white" />
    </div>
  )
}

export default BackgroundSquare

import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"
import React from "react"

// TODO: apply mask image style
const backgroundSquareVariants = cva(
  "flex min-h-screen items-center justify-center bg-neutral-200 bg-grid-xl-slate-300/20",
  {
    variants: {
      variant: {
        default: "bg-center",
        topDown: "bg-top",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type TBackgroundSquareProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof backgroundSquareVariants>

const BackgroundSquare = ({
  children,
  className,
  variant,
  ...props
}: TBackgroundSquareProps) => {
  return (
    <div
      className={cn(backgroundSquareVariants({ variant }), className)}
      {...props}
    >
      <div className="z-10 h-full w-full">{children}</div>
      <div
        className={cn(
          "pointer-events-none absolute inset-0 flex items-center justify-center bg-neutral-200 p-28 backdrop-blur-lg  dark:bg-white",
          {
            "[mask-image:radial-gradient(ellipse_at_center,transparent_0%,var(--neutral-200)_70%)]":
              variant === "default",
            "[mask-image:radial-gradient(ellipse_at_top,transparent_0%,var(--neutral-200)_70%)]":
              variant === "topDown",
          }
        )}
      />
    </div>
  )
}

export default BackgroundSquare

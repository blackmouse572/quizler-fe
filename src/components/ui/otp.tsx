import { cn } from "@/lib/utils"
import { useCallback } from "react"
import OtpInput, { InputProps, OTPInputProps } from "react-otp-input"

type OTPProps = Omit<OTPInputProps, "renderInput" | "containerStyle"> & {
  className?: string
  inputClassName?: string
}

const Otp = ({
  className,
  inputClassName,
  numInputs = 6,
  ...props
}: OTPProps): JSX.Element => {
  const renderInput = useCallback(
    ({ className, ...props }: InputProps, index: number) => {
      return (
        <input
          className={cn(
            "rounded-md border border-neutral-300 bg-neutral-50",
            "min-h-10 min-w-8",
            className,
            inputClassName
          )}
          {...props}
        />
      )
    },
    []
  )
  return (
    <OtpInput
      containerStyle={cn("gap-2", className)}
      renderInput={renderInput}
      numInputs={numInputs}
      {...props}
    />
  )
}

export default Otp

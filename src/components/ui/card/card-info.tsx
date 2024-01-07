import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card"

import { Icons } from "@/components/ui/icons"

import {
  TCardContainerProps,
  THeaderProps,
  TSubtitleProps,
  TTitleProps,
} from "./index.type"

export interface ICardInfoProps extends TCardContainerProps {
  title: string
  subTitle?: string
  arrowIcon?: boolean
  isIconUp?: boolean
  titleProps?: TTitleProps
  headerProps?: THeaderProps
  subTitleProps?: TSubtitleProps
}

export function CardInfo(props: ICardInfoProps) {
  const {
    title,
    subTitle,
    titleProps,
    headerProps,
    subTitleProps,
    arrowIcon = false,
    isIconUp = true,
    ...others
  } = props

  const IconDefaultStyle: string = "relative top-2 mt-0 h-[32px] w-[48px]"

  return (
    <Card
      {...others}
      className={cn("min-w-[100px] rounded-3xl", others.className)}
    >
      <CardHeader
        {...headerProps}
        className={cn(
          "flex flex-row justify-between space-x-2 p-5",
          headerProps?.className
        )}
      >
        <div className="space-y-2 overflow-hidden text-ellipsis">
          <CardTitle {...titleProps}>{title}</CardTitle>
          <CardDescription className="truncate" {...subTitleProps}>
            {subTitle}
          </CardDescription>
        </div>
        {arrowIcon && (
          <div className="h-[50px] w-[50px] rounded-full bg-[#E5E5E5]">
            {isIconUp ? (
              <Icons.ArrowUp className={IconDefaultStyle} />
            ) : (
              <Icons.ArrowDown className={IconDefaultStyle} />
            )}
          </div>
        )}
      </CardHeader>
    </Card>
  )
}

import * as React from "react"

import { cn } from "@/lib/utils"
import { ButtonDropdown } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card"

import {
  TCardContainerProps,
  THeaderProps,
  TSubtitleProps,
  TTitleProps,
} from "./index.type"

export interface ICardInfoProps extends TCardContainerProps {
  title: string
  subTitle?: string
  expand?: boolean
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
    expand = false,
    ...others
  } = props


  return (
    <Card
      {...others}
      className={cn("min-w-[100px] rounded-3xl", others.className)}
    >
      <CardHeader
        {...headerProps}
        className={cn("flex flex-row space-x-2 justify-between p-5", headerProps?.className) }
      >
        <div className="overflow-hidden text-ellipsis">
          <CardTitle {...titleProps}>{title}</CardTitle>
          <CardDescription className="truncate" {...subTitleProps}>
            {subTitle}
          </CardDescription>
        </div>
        {expand && <ButtonDropdown style={{margin: 0}} className="rounded-full w-[3.5em] h-[3em] mt-0 relative bottom-1" />}
      </CardHeader>
    </Card>
  )
}

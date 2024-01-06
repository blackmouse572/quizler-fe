import * as React from "react"

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
  titleProps?: TTitleProps
  headerProps?: THeaderProps
  subTitleProps?: TSubtitleProps
}

export function CardInfo(props: ICardInfoProps) {
  const { title, subTitle, titleProps, headerProps, subTitleProps, ...others } =
    props
  return (
    <Card className="min-w-[100px] rounded-3xl" {...others}>
      <CardHeader {...headerProps}>
        <CardTitle {...titleProps}>{title}</CardTitle>
        <CardDescription {...subTitleProps}>{subTitle}</CardDescription>
      </CardHeader>
    </Card>
  )
}

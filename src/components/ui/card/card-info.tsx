import * as React from "react"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card"
import { THeaderProps, TSubtitleProps, TTitleProps } from "./index.type"

export interface ICardInfoProps {
  title: string
  subTitle?: string
  titleProps?: TTitleProps
  headerProps?: THeaderProps
  subTitleProps?: TSubtitleProps
}

export function CardInfo(props: ICardInfoProps) {
  const { title, subTitle, titleProps } = props
  return (
    <Card className="min-w-[100px]">
      <CardHeader>
        <CardTitle ref={titleProps?.ref} {...titleProps?.props}>
          {title}
        </CardTitle>
        <CardDescription>{subTitle}</CardDescription>
      </CardHeader>
    </Card>
  )
}

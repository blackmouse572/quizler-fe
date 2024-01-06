import React from "react"

export interface ICardProps<P> extends React.HTMLAttributes<P> {
  ref?: React.ForwardedRef<P>
}

export type TCardContainerProps = ICardProps<HTMLDivElement>

export type TTitleProps = ICardProps<HTMLHeadingElement>

export type THeaderProps = ICardProps<HTMLDivElement>

export type TSubtitleProps = ICardProps<HTMLParagraphElement>

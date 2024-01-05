export interface ICardProps<P, R> {
  props?: P
  ref?: R
}

export type TTitleProps = ICardProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  React.ForwardedRef<HTMLParagraphElement>
>

export type THeaderProps = ICardProps<
  React.HTMLAttributes<HTMLDivElement>,
  React.ForwardedRef<HTMLParagraphElement>
>

export type TSubtitleProps = ICardProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  React.ForwardedRef<HTMLParagraphElement>
>

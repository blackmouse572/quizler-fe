import { cn } from "@/lib/utils"

type Props = React.ComponentPropsWithoutRef<"div">

type TCardHeader = {
  title?: string
  subTitle: string
}

type TCardFooter = {
  footer: string
}

interface ICardProps extends Props {
  header?: TCardHeader
  footer?: TCardFooter
}

export const Card = ({ children, ...props }: ICardProps) => {
  const { header, footer } = props

  return (
    <div className="bg-zinc-50 rounded-lg min-w-[18vw] w-[230px]">
      <div className="m-4 relative">
        <div>
          <div className="font-bold">Card Header</div>
          <div className="text-slate-500">sub title</div>
        </div>
        {/* body */}
        {children && <div>{children}</div>}
        <div className={cn([!children && 'absolute top-[4.5em]'])}>
          <div>Footer</div>
        </div>
      </div>
    </div>
  )
}

export default Card

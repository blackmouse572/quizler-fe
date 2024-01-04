import Card from "./card"

type Props = React.ComponentPropsWithoutRef<"div">

export const CardPrompt = ({ children, ...props }: Props) => {
  return (
    <Card>
      <div>body</div>
    </Card>
  )
}

export default CardPrompt

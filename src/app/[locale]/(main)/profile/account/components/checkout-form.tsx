import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { EmbeddedCheckout } from "@stripe/react-stripe-js"

type Props = {
  children: React.ReactNode
}

const CheckoutForm = ({ children }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] overflow-y-scroll max-h-[80vh]">
        <EmbeddedCheckout />
      </DialogContent>
    </Dialog>
  )
}

export default CheckoutForm

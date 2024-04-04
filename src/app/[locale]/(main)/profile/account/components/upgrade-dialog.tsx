import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AccountPlan } from "../type"
import { fetchStripeSessionId } from "../actions/feat-checkout-sessionid"
import { useRouter } from "next/navigation"
import checkout from "@/lib/stripe"

type Props = {
  plan: AccountPlan
}

const UpgradeDialog = ({ plan }: Props) => {
  const router = useRouter()
  const navigateToCheckout = async () => {
    const res = await fetchStripeSessionId(plan)
    const { sessionId, pubKey } = res.data

    checkout(sessionId, pubKey)
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onSelect={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          type="submit"
        >
          {"Upgrade"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{"title"}</DialogTitle>
          <DialogDescription>{"desc"}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" color="accent">
              {"Close"}
            </Button>
          </DialogClose>
          <Button
            variant="default"
            color="danger"
            onClick={() => {
              navigateToCheckout()
            }}
          >
            {"Upgrade"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UpgradeDialog

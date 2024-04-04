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
import checkout from "@/lib/stripe"
import { useTranslations } from "next-intl"

type Props = {
  plan: AccountPlan
}

const UpgradeDialog = ({ plan }: Props) => {
  const i18n = useTranslations("Settings.plans.upgrade_dialog")
  const navigateToCheckout = async () => {
    const res = await fetchStripeSessionId(plan)
    const { sessionId, pubKey } = res.data

    // Navigate to Stripe
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
          {i18n("buttons.upgrade")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{i18n("title", { plan: plan.title })}</DialogTitle>
          <DialogDescription>{i18n("description")}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" color="accent">
              {i18n("buttons.cancel")}
            </Button>
          </DialogClose>
          <Button
            variant="default"
            color="success"
            onClick={() => {
              navigateToCheckout()
            }}
          >
            {i18n("buttons.upgrade")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UpgradeDialog

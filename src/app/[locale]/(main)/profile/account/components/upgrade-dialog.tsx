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
import { STRIPE_PK } from "@/lib/constant"
import { Plan } from "@/types"
import { EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useTranslations } from "next-intl"
import { useCallback, useMemo, useState } from "react"
import {
  fetchStripeSessionId,
  saveTransaction,
} from "../actions/fetch-checkout"
import CheckoutForm from "./checkout-form"

type Props = {
  plan: Plan
}
const stripePromise = loadStripe(STRIPE_PK)

const UpgradeDialog = ({ plan }: Props) => {
  const i18n = useTranslations("Settings.plans.upgrade_dialog")
  const [clientSecret, setClientSecret] = useState("")
  const [sessionId, setSessionId] = useState("")
  const fetchClientSecret = useCallback(async () => {
    const res = await fetchStripeSessionId(plan)
    const { sessionId, clientSecret } = res.data

    setClientSecret(clientSecret)
    setSessionId(sessionId)
  }, [plan])

  const onComplete = useCallback(async () => {
    const res = await saveTransaction(sessionId)
  }, [sessionId])

  const options = useMemo(
    () => ({
      clientSecret: clientSecret,
      onComplete: onComplete,
    }),
    [clientSecret, onComplete]
  )

  if (plan.amount === 0) return null
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            onSelect={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
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
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
              <CheckoutForm>
                <Button
                  variant="default"
                  color="success"
                  onClick={() => fetchClientSecret()}
                >
                  {i18n("buttons.upgrade")}
                </Button>
              </CheckoutForm>
            </EmbeddedCheckoutProvider>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default UpgradeDialog

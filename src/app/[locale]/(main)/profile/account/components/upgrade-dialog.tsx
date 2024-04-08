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
import { useTranslations } from "next-intl"
import CheckoutForm from "./checkout-form"
import { useCallback, useMemo, useState } from "react"
import {
  saveTransaction,
  fetchStripeSessionId,
} from "../actions/fetch-checkout"
import { loadStripe } from "@stripe/stripe-js"
import { EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"

type Props = {
  plan: AccountPlan
}

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

  const stripePromise = loadStripe(
    "pk_test_51L99bOEg8CatoOFy44Ei3Gpgrt58l7M3FeCtE2qDuToOVpahg9dvZwTfCyaKLhwl46SmhlADUHStjSZvwbVLiQM600Jaw3nkDA"
  )

  const options = useMemo(
    () => ({
      clientSecret: clientSecret,
      onComplete: onComplete,
    }),
    [clientSecret, onComplete]
  )

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

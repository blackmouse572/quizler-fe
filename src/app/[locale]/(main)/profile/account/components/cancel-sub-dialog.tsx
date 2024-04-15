import { cancelPlan } from "@/app/[locale]/(main)/profile/account/actions/put-cancel-sub"
import { AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { useToast } from "@/components/ui/use-toast"
import { Plan } from "@/types"
import { useTranslations } from "next-intl"
import { useState } from "react"

function CancelSubscription({ plan }: { plan: Plan }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const t = useTranslations("Settings")
  const error = useTranslations("Errors")
  const { toast } = useToast()
  const handleCancel = async () => {
    // cancel subscription
    setIsLoading(true)
    const res = await cancelPlan()
    if (res.ok) {
      setIsOpen(false)
      toast({
        title: t("plans.cancel_dialog.success"),
        color: "success",
      })
    } else {
      toast({
        title: error("index"),
        description: error(res.message as any),
        color: "danger",
      })
    }
    setIsLoading(false)
  }
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button color="danger" className="min-w-32">
          {t("plans.cancel_dialog.buttons.cancel")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertTitle>
          {t("plans.cancel_dialog.title", {
            plan: plan.title,
          })}
        </AlertTitle>
        <AlertDescription>
          {t("plans.cancel_dialog.description")}
        </AlertDescription>
        <div className="flex justify-end gap-4">
          <Button
            variant="light"
            disabled={isLoading}
            onClick={() => setIsOpen(false)}
          >
            {t("plans.cancel_dialog.buttons.cancel")}
          </Button>
          <Button color="danger" disabled={isLoading} onClick={handleCancel}>
            {isLoading && <Icons.Loader className="animate-spin" />}
            {t("plans.cancel_dialog.buttons.confirm")}
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default CancelSubscription

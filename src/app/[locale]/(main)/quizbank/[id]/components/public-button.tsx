import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useTranslations } from "next-intl"
import React, {
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from "react"

type Props = {
  handleChangeVisibility: () => void
  quizBankVisibility: "Public" | "Private"
}

const PublicButton = React.forwardRef(
  ({ handleChangeVisibility, quizBankVisibility }: Props, ref) => {
    const i18N = useTranslations("Change_quizbank_visibility")

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    useImperativeHandle(ref, () => ({
      setIsLoading,
    }))

    const toggleVisibility = useMemo(
      () => (quizBankVisibility === "Public" ? "Private" : "Public"),
      [quizBankVisibility]
    )

    const confirmDialog = useCallback(
      () => (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {i18N("confirm_dialog.title")}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {i18N("confirm_dialog.description", {
                  visibility: i18N(`visibility.${toggleVisibility}`),
                })}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  setIsOpen(false)
                  setIsLoading(false)
                }}
              >
                {i18N("confirm_dialog.cancel")}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  handleChangeVisibility()
                  setIsOpen(false)
                  setIsLoading(false)
                }}
              >
                {i18N("confirm_dialog.continue")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ),
      [handleChangeVisibility, i18N, isOpen, toggleVisibility]
    )

    return (
      <>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              color="accent"
              isIconOnly
              onClick={() => {
                setIsOpen(true)
              }}
              disabled={isLoading}
            >
              {quizBankVisibility === "Private" ? (
                <Icons.Eye />
              ) : (
                <Icons.EyeOff />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {i18N(`visibility.${toggleVisibility}`)}
          </TooltipContent>
        </Tooltip>
        {isOpen && confirmDialog()}
      </>
    )
  }
)

PublicButton.displayName = "PublicButton"

export default PublicButton

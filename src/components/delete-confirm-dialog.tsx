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
import { IIconKeys, Icons } from "@/components/ui/icons"
import { useMemo } from "react"

type Props = {
  title: string
  description: string
  disabled?: boolean
  isOpen: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  onAction: () => void
  terms?: {
    cancel: string
    action: string
  }
  iconKey?: IIconKeys
}

function ActionDialogConfirm({
  title,
  description,
  isOpen,
  setOpen,
  terms,
  onAction,
  iconKey,
  disabled = false,
}: Props) {
  const ActionIcon = useMemo(
    () => (iconKey ? Icons[iconKey] : Icons["Delete"]),
    [iconKey]
  )
  return (
    <AlertDialog onOpenChange={setOpen} open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)} disabled={disabled}>
            {terms?.cancel || "Cancel"}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onAction}
            color="danger"
            disabled={disabled}
          >
            {disabled ? (
              <Icons.Loader className="animate-spin" />
            ) : (
              ActionIcon && <ActionIcon />
            )}
            {terms?.action || "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ActionDialogConfirm

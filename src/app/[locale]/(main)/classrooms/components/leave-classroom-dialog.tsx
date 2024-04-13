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
import { Icons } from "@/components/ui/icons"

type Props = {
  title: string
  description: string
  disabled?: boolean
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  terms?: {
    cancel: string
    leave: string
  }
}

function LeaveDialogConfirm({
  title,
  description,
  isOpen,
  onOpenChange,
  terms,
  onConfirm,
  disabled = false,
}: Props) {
  return (
    <AlertDialog onOpenChange={onOpenChange} open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={disabled}>
            {terms?.cancel || "Cancel"}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            color="danger"
            disabled={disabled}
          >
            {disabled ? (
              <Icons.Loader className="animate-spin" />
            ) : (
              <Icons.Delete />
            )}
            {terms?.leave || "Leave"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default LeaveDialogConfirm

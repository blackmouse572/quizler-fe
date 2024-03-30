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
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  onDelete: () => void
  terms?: {
    cancel: string
    delete: string
  }
}

function DeleteDialogConfirm({
  title,
  description,
  isOpen,
  setOpen,
  terms,
  onDelete,
  disabled = false,
}: Props) {
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
            onClick={onDelete}
            color="danger"
            disabled={disabled}
          >
            {disabled ? (
              <Icons.Loader className="animate-spin" />
            ) : (
              <Icons.Delete />
            )}
            {terms?.delete || "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteDialogConfirm

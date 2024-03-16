import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog"

type Props = {
  title: string
  description: string
  isOpen: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  onDelete: () => void
}

function DeleteDialogConfirm({
  title,
  description,
  isOpen,
  setOpen,
  onDelete,
}: Props) {
  return (
    <Dialog onOpenChange={setOpen} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          {title}
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant={"ghost"}
            onClick={(e) => {
              e.stopPropagation()
              setOpen(false)
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
            color="danger"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteDialogConfirm

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog"

type Props = {
  deleteUrl: string
  title: string
  description: string
  isOpen: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function DeleteDialogConfirm({
  deleteUrl,
  title,
  description,
  isOpen,
  setOpen,
}: Props) {
  const onDelete = async () => {
    // TODO: Implement delete
  }
  return (
    <Dialog onOpenChange={setOpen} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          {title}
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant={"ghost"} onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={onDelete} color="danger">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteDialogConfirm

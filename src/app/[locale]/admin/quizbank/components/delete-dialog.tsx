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
import { Icons } from "@/components/ui/icons"
import { useTranslations } from "next-intl"

type Props = {
  ids: string[]
} & React.ComponentProps<"div">

function DeleteDialog({ ids, ...props }: Props) {
  const tableI18n = useTranslations("Table")
  return (
    <Dialog {...props}>
      <DialogTrigger asChild>
        <Button variant="outline" color="danger">
          <Icons.Delete />
          {tableI18n("delete")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Items</DialogTitle>
          <DialogDescription>
            {tableI18n.rich("delete_message", {
              span: (children) => (
                <span className="font-bold">({ids.length})</span>
              ),
            })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" color="accent">
              Cancel
            </Button>
          </DialogClose>
          <Button variant="default" color="danger">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteDialog

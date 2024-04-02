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
        <Button color="danger" size={"sm"}>
          <Icons.Delete />
          {tableI18n("delete")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{tableI18n("delete_title")}</DialogTitle>
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
              {tableI18n("cancel")}
            </Button>
          </DialogClose>
          <Button variant="default" color="danger">
            {tableI18n("delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteDialog

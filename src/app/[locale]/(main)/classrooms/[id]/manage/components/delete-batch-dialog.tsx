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

export default function DeleteBatchDialog({ ids, ...props }: Props) {
  const i18n = useTranslations("Members_classroom")
  return (
    <Dialog {...props}>
      <DialogTrigger asChild>
        <Button color="danger" size={"sm"}>
          <Icons.Delete />
          {i18n("remove_batch.title")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{i18n("remove_batch.title")}</DialogTitle>
          <DialogDescription>
            {i18n.rich("remove_batch.delete_message", {
              span: (children) => (
                <span className="font-bold">({ids.length})</span>
              ),
            })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" color="accent">
              {i18n("remove_batch.cancel_btn")}
            </Button>
          </DialogClose>
          <Button variant="default" color="danger">
            {i18n("remove_batch.delete_btn")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

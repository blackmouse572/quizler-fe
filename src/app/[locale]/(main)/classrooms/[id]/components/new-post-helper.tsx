import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Icons } from "@/components/ui/icons"
import KBD from "@/components/ui/kbd"
import { AlertDialogProps } from "@radix-ui/react-alert-dialog"

import { useTranslations } from "next-intl"
import { useMemo } from "react"

type Props = AlertDialogProps

function NewPostHelperDialog({ children, ...props }: Props) {
  const t = useTranslations("ClassroomDetails.posts.help")
  const editor = useTranslations("Editor")
  const items = useMemo(
    () => [
      {
        title: editor("marks.bold"),
        icon: Icons.Bold,
        shortcut: "Ctrl + B",
      },
      {
        title: editor("marks.italic"),
        icon: Icons.Italic,
        shortcut: "Ctrl + I",
      },
      {
        title: editor("marks.underline"),
        icon: Icons.Underline,
        shortcut: "Ctrl + U",
      },
      {
        title: editor("marks.strike"),
        icon: Icons.Strike,
        shortcut: "Ctrl + Shift + S",
      },
      {
        title: editor("marks.code"),
        icon: Icons.Code,
        shortcut: "Ctrl + Shift + C",
      },
      {
        title: editor("marks.highlight"),
        icon: Icons.Hightline,
        shortcut: "Ctrl + Shift + H",
      },
      {
        title: editor("nodes.list"),
        icon: Icons.Bullet,
        shortcut: "Ctrl + Shift + L",
      },
      {
        title: editor("nodes.heading"),
        icon: Icons.Heading1,
        shortcut: "Ctrl + Shift + 1",
      },
      {
        title: editor("nodes.blockquote"),
        icon: Icons.Quote,
        shortcut: "Ctrl + Shift + Q",
      },
      {
        title: editor("history.undo"),
        icon: Icons.ArrowRight,
        shortcut: "Ctrl + Z",
      },
      {
        title: editor("history.redo"),
        icon: Icons.ArrowRight,
        shortcut: "Ctrl + y",
      },
    ],
    [editor]
  )
  return (
    <AlertDialog {...props}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="max-w-lg lg:max-w-4xl">
        <AlertDialogHeader>
          <AlertDialogTitle>{t("title")}</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {items.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <item.icon className="h-6 w-6" />
                  <div>
                    <p className="font-bold">{item.title}</p>
                    <KBD className="text-xs">{item.shortcut}</KBD>
                  </div>
                </div>
              ))}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("confirm")}</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default NewPostHelperDialog

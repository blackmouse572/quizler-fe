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

function FlashcardHelperDialog({ children, ...props }: Props) {
  const t = useTranslations("ViewQuizBank.ViewFlashcard")
  const items = useMemo(
    () => [
      {
        title: t("play_button"),
        icon: Icons.Play,
        shortcut: "p",
      },
      {
        title: t("pause_button"),
        icon: Icons.Pause,
        shortcut: "p",
      },
      {
        title: t("shuffle_button"),
        icon: Icons.Shuffle,
        shortcut: "r",
      },
      {
        title: t("stop_shuffle"),
        icon: Icons.ArrowsRight,
        shortcut: "r",
      },
      {
        title: t("prev_flashcard"),
        icon: Icons.ChevronLeft,
        shortcut: "←",
      },
      {
        title: t("next_flashcard"),
        icon: Icons.ChevronRight,
        shortcut: "→",
      },
      {
        title: t("flip_flashcard"),
        icon: Icons.ChevronUp,
        shortcut: "↑, ↓, h, j",
      }
    ],
    [t]
  )
  return (
    <AlertDialog {...props}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="max-w-lg lg:max-w-4xl">
        <AlertDialogHeader>
          <AlertDialogTitle>{t("help.title")}</AlertDialogTitle>
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
          <AlertDialogCancel>{t("help.confirm")}</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default FlashcardHelperDialog

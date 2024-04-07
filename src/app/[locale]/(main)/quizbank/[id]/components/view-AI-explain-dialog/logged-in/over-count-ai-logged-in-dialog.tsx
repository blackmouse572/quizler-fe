"use client"

import { Button } from "@/components/ui/button"
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { useTranslations } from "next-intl"
import Link from "next/link"

export default function OverCountAILoggedInDialog() {
  const i18n = useTranslations("ViewQuizBank")

  return (
    <div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="space-y-2">
            <DialogTitle>
              {i18n("view_ai_answer_error.overcount_ai.title")}
            </DialogTitle>
            <DialogDescription>
              {i18n("view_ai_answer_error.overcount_ai.description")}
            </DialogDescription>
          </div>

          <div className="w-full max-w-sm items-center gap-1.5">
            {i18n.rich("view_ai_answer_error.overcount_ai.solution", {
              strong: (children) => <b>{children}</b>,
            })}
          </div>
        </DialogHeader>
        <DialogFooter className="mt-4 flex justify-between sm:justify-between">
          <DialogClose asChild>
            <Button type="reset" variant="outline" color="accent">
              {i18n("view_ai_answer_error.overcount_ai.cancel")}
            </Button>
          </DialogClose>
          <Link href={`/profile/account`}>
            <Button type="submit" variant="default">
              {i18n("view_ai_answer_error.overcount_ai.submit")}
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </div>
  )
}

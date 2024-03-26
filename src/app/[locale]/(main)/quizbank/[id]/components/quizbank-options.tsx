"use client"

import React, { useCallback, useMemo, useRef, useState } from "react"
import CopyQuizBankDialog from "./copy-quizbank-dialog/copy-quizbank-dialog"
import { toast } from "@/components/ui/use-toast"
import { updateQuizBankAction } from "../../add/actions/add-quiz-bank-action"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import EditQuizBank from "./edit-button"
import { useTranslations } from "next-intl"
import PublicButton from "./public-button"

type Props = {
  quizBankVisibility: "Private" | "Public"
  quizbankId: string
  userCurrentClass: any
  isOwnQuizBank?: boolean
}

const QuizBankActions = ({
  isOwnQuizBank,
  userCurrentClass,
  quizbankId,
  quizBankVisibility,
}: Props) => {
  const i18n = useTranslations("ViewQuizBank")
  const i18N = useTranslations("Change_quizbank_visibility")
  const iErrors = useTranslations("Errors")

  const toggleQuizBankVisibility = useCallback(async () => {
    const togglevalue = quizBankVisibility === "Private" ? "Public" : "Private"
    const result = await updateQuizBankAction(
      { visibility: togglevalue },
      quizbankId.toString()
    )
    if (!result.ok) {
      return toast({
        title: i18N("message.failed.title"),
        description: iErrors(result.message),
        variant: "flat",
        color: "danger",
      })
    } else {
      const visibility = i18N(`visibility.${togglevalue}`)
      return toast({
        title: i18N("message.success.title"),
        description: i18N("message.success.description", { visibility }),
        variant: "flat",
        color: "success",
      })
    }
  }, [i18N, iErrors, quizBankVisibility, quizbankId])

  const quizBankActions = useMemo(() => {
    const defaultButtons = [
      <CopyQuizBankDialog
        key="copy-quiz-bank"
        quizbankId={quizbankId}
        buttonContent={i18n("author.copy_button")}
        classes={userCurrentClass}
      />,
    ]
    const OwnerQuizBankButtons = [
      <EditQuizBank
        key="edit-quiz-bank"
        quizbankId={quizbankId}
        content={i18n("author.edit_button")}
      />,
      <PublicButton
        key="change-visibility"
        quizBankVisibility={quizBankVisibility}
        handleChangeVisibility={toggleQuizBankVisibility}
      />,
    ]
    const visitorQuizBankButtons = [
      <Tooltip key="report-quiz-bank">
        <TooltipTrigger asChild>
          <Button color="accent" isIconOnly>
            <Icons.Report />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{i18n("author.report_button")}</TooltipContent>
      </Tooltip>,
    ]

    let shouldUsedButtons: React.JSX.Element[]
    if (isOwnQuizBank) {
      shouldUsedButtons = [...OwnerQuizBankButtons]
    } else {
      shouldUsedButtons = [...visitorQuizBankButtons]
    }
    return [...defaultButtons, ...shouldUsedButtons]
  }, [
    i18n,
    isOwnQuizBank,
    quizBankVisibility,
    quizbankId,
    toggleQuizBankVisibility,
    userCurrentClass,
  ])

  return (
    <div className="flex justify-between gap-2">
      {quizBankActions.map((btn) => btn)}
    </div>
  )
}

export default QuizBankActions

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import UserDisplay from "@/components/user-display"
import { getToken } from "@/lib/auth"
import { fetchClassroomCurrentUser } from "@/services/account.service"
import { Classroom, User } from "@/types"
import { useTranslations } from "next-intl"
import { use, useMemo } from "react"
import CopyQuizBankDialog from "./copy-quizbank-dialog/copy-quizbank-dialog"
import EditQuizBank from "./edit-button"
import ReportQuizBankDialog from "./report-quizbank-dialog/report-quizbank-dialog"

type Props = {
  authorData: User
  classname?: string
  quizbankId: string
  isOwnQuizBank?: boolean
}

export default function AuthorQuizBank({
  authorData,
  classname,
  quizbankId,
  isOwnQuizBank,
}: Props) {
  const i18n = useTranslations("ViewQuizBank")
  const { token } = getToken()
  const { data: userCurrentClass }: { data: Classroom[] } = use(
    fetchClassroomCurrentUser(token)
  )

  // TODO: set action for public button
  const quizBankActions = useMemo(() => {
    const defaultButtons = [
      <CopyQuizBankDialog
        token={token}
        quizbankId={quizbankId}
        buttonContent={i18n("author.copy_button")}
        classes={userCurrentClass}
      />,
    ]
    const OwnerQuizBankButtons = [
      <EditQuizBank
        quizbankId={quizbankId}
        content={i18n("author.edit_button")}
      />,
      <Tooltip>
        <TooltipTrigger asChild>
          <Button color="accent" isIconOnly>
            <Icons.Eye />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{i18n("author.public_button")}</TooltipContent>
      </Tooltip>,
    ]
    const visitorQuizBankButtons = [
      <ReportQuizBankDialog
        token={token}
        quizbankId={quizbankId}
        buttonContent={i18n("author.report_button")}
      />,
    ]

    let shouldUsedButtons: React.JSX.Element[]
    if (isOwnQuizBank) {
      shouldUsedButtons = [...OwnerQuizBankButtons]
    } else {
      shouldUsedButtons = [...visitorQuizBankButtons]
    }
    return (shouldUsedButtons = [...defaultButtons, ...shouldUsedButtons])
  }, [i18n, isOwnQuizBank, quizbankId, token, userCurrentClass])

  return (
    <div className="space-y-4">
      <div className=" border-b-2 border-gray-300 text-xl font-bold leading-8 text-black max-md:mt-10 max-md:max-w-full" />
      <div className="mt-16 text-xl font-bold leading-8 text-black max-md:mt-10 max-md:max-w-full">
        {i18n("belong_to")}
      </div>
      {classname && (
        <div className="ml-3.5 mt-6 flex w-[874px] max-w-full justify-between gap-5 px-5 font-medium max-md:flex-wrap">
          <div className="flex-auto text-2xl leading-10 text-black">
            {i18n("author.class_title")}:{" "}
            <span className="font-bold">
              {i18n("author.class_title")} $Biology {i18n("author.of")}{" "}
              {authorData.fullName}
            </span>
          </div>
        </div>
      )}

      <div className="flex max-w-full justify-between gap-5 pr-6 max-md:flex-wrap max-md:pr-5">
        <div className="flex justify-between gap-2 whitespace-nowrap">
          <UserDisplay user={authorData} withLink={true} />
        </div>
        <div className="flex justify-between gap-2">
          {quizBankActions.map((btn) => btn)}
        </div>
      </div>
    </div>
  )
}

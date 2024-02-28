import { useTranslations } from "next-intl"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { CopyIcon, InfoCircledIcon } from "@radix-ui/react-icons"
import QuizBank from "@/types/QuizBank"

type Props = {
  data: QuizBank
}

export default function RecommendQuizBank({ data }: Props) {
  const i18n = useTranslations("ViewQuizBank")

  return (
    <>
      {/* recommend */}
      <div className="mt-16 w-[849px] border-b-2 border-gray-300 text-xl font-bold leading-8 text-black max-md:mt-10 max-md:max-w-full" />
      <div className="mt-16 items-stretch text-xl font-bold leading-8 text-black max-md:mt-10 max-md:max-w-full">
        {i18n("ViewQuizzes.recommend_quiz_bank")}
      </div>
      <div className="mt-7 flex w-[849px] max-w-full justify-between gap-5 overflow-x-auto px-5 max-md:flex-wrap">
        <div className="flex flex-1 flex-col justify-center rounded-3xl border border-solid border-[color:var(--color-border,#E4E4E7)] bg-white shadow">
          <div className="flex flex-col items-start py-6 pl-6 pr-20 max-md:px-5">
            <div className="whitespace-nowrap text-base font-semibold leading-6 text-zinc-950">
              Lorem isplum
            </div>
            <div className="mt-1.5 text-sm leading-5 text-zinc-500">
              320 cards
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-center rounded-3xl border border-solid border-[color:var(--color-border,#E4E4E7)] bg-white shadow">
          <div className="flex flex-col items-start py-6 pl-6 pr-20 max-md:px-5">
            <div className="whitespace-nowrap text-base font-semibold leading-6 text-zinc-950">
              Lorem isplum
            </div>
            <div className="mt-1.5 text-sm leading-5 text-zinc-500">
              320 cards
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-center rounded-3xl border border-solid border-[color:var(--color-border,#E4E4E7)] bg-white shadow">
          <div className="flex flex-col items-start py-6 pl-6 pr-20 max-md:px-5">
            <div className="whitespace-nowrap text-base font-semibold leading-6 text-zinc-950">
              Lorem isplum
            </div>
            <div className="mt-1.5 text-sm leading-5 text-zinc-500">
              320 cards
            </div>
          </div>
        </div>
        <div className="z-10 flex flex-1 flex-col justify-center rounded-3xl border border-solid border-[color:var(--color-border,#E4E4E7)] bg-white shadow">
          <div className="flex flex-col items-start py-6 pl-6 pr-20 max-md:px-5">
            <div className="whitespace-nowrap text-base font-semibold leading-6 text-zinc-950">
              Lorem isplum
            </div>
            <div className="mt-1.5 text-sm leading-5 text-zinc-500">
              320 cards
            </div>
          </div>
        </div>
      </div>

      {/* author */}
      <div className="mt-16 w-[849px] border-b-2 border-gray-300 text-xl font-bold leading-8 text-black max-md:mt-10 max-md:max-w-full" />
      <div className="mt-16 text-xl font-bold leading-8 text-black max-md:mt-10 max-md:max-w-full">
        {i18n("belong_to")}
      </div>
      <div className="ml-3.5 mt-6 flex w-[874px] max-w-full justify-between gap-5 px-5 font-medium max-md:flex-wrap">
        <div className="flex-auto text-2xl leading-10 text-black">
          {i18n("author.class_title")}:{" "}
          <span className="font-bold">Eva’s class Biology</span>
        </div>
      </div>

      <div className="ml-3.5 flex w-[874px] max-w-full justify-between gap-5 pr-6 max-md:flex-wrap max-md:pr-5">
        <div className="flex justify-between gap-2 whitespace-nowrap">
          <img
            loading="lazy"
            srcSet="..."
            className="my-auto aspect-square w-8"
          />
          <div className="flex flex-1 flex-col">
            <div className="text-sm font-medium leading-5 text-zinc-950">
              Teacher: Eva Doe
            </div>
            <div className="text-xs leading-4 text-zinc-500">
              eva@example.com
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="light" color={null}>
                  <CopyIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{i18n("author.copy_button")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="light" color={null}>
                  <InfoCircledIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{i18n("author.report_button")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* footer, link to another */}
      <div className="mt-80 flex w-full flex-col items-start justify-center self-stretch bg-white px-11 py-7 text-base max-md:mt-10 max-md:max-w-full max-md:px-5">
        <div className="flex w-[923px] max-w-full justify-between gap-5 max-md:flex-wrap">
          <div className="flex flex-col">
            <div className="flex justify-between gap-1.5 whitespace-nowrap text-center tracking-widest text-black">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/86b70a3d23b6e625c9aab5ac0ce591e471f393f213e877b530e86aaca7d8b45d?"
                className="aspect-square w-6"
              />
              <div className="flex-auto">Quizlearn</div>
            </div>
            <div className="leading-6 text-zinc-900">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              mi risus, lobortis sit amet urna ac, aliquam interdum nibh.
              Phasellus vestibulum tincidunt tellus,{" "}
            </div>
          </div>
          <div className="flex flex-col self-start py-1.5 font-semibold leading-[150%] text-zinc-900">
            <div className="flex justify-between gap-5 px-0.5">
              <div>Link 1</div>
              <div>Link 1</div>
              <div>Link 1</div>
            </div>
            <div className="mt-7 flex justify-between gap-5 px-0.5">
              <div>Link 1</div>
              <div>Link 1</div>
              <div>Link 1</div>
            </div>
            <div className="mt-7 flex justify-between gap-5 px-0.5">
              <div>Link 1</div>
              <div>Link 1</div>
              <div>Link 1</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

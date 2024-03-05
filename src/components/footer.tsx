import { Icons } from "@/components/ui/icons"
import { useTranslations } from "next-intl"

type Props = {
  className?: string
}

export default function Footer({ className }: Props) {
  const tIndex = useTranslations("Index")
  const tFooter = useTranslations("Footer")

  return (
    <>
      <div className="flex w-full flex-col items-start justify-center self-stretch bg-white px-11 py-7 text-base max-md:mt-10 max-md:max-w-full max-md:px-5">
        <div className="flex w-[923px] max-w-full justify-between gap-5 max-md:flex-wrap">
          <div className="flex flex-col">
            <div className="text-blsack flex gap-1.5 whitespace-nowrap text-center tracking-widest">
              <Icons.Icon className="mr-2 h-6 w-6" />
              <span className="font-bold">{tIndex("title")}</span>
            </div>
            <div className="w-6/12 leading-6 text-zinc-900">
              {tFooter("description")}{" "}
            </div>
          </div>
          <div className="flex flex-col self-start py-1.5 font-semibold leading-[150%] text-zinc-900">
            <div className="mb-7 flex justify-between gap-4 px-0.5">
              <div className="mr-14 w-14">Link 1</div>
              <div className="mr-14 w-14">Link 1</div>
              <div className="mr-14 w-14">Link 1</div>
            </div>
            <div className="mb-7 flex justify-between gap-4 px-0.5">
              <div className="mr-14 w-14">Link 1</div>
              <div className="mr-14 w-14">Link 1</div>
              <div className="mr-14 w-14">Link 1</div>
            </div>
            <div className="mb-7 flex justify-between gap-4 px-0.5">
              <div className="mr-14 w-14">Link 1</div>
              <div className="mr-14 w-14">Link 1</div>
              <div className="mr-14 w-14">Link 1</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

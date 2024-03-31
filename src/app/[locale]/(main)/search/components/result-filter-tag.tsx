import { useTranslations } from "next-intl"

type Props = {
  search: string
}

export default function ResultFilterTag({ search }: Props) {
  const tSearch = useTranslations("SearchPage")

  return (
    <div className="flex w-full justify-between gap-5 px-0.5 max-md:max-w-full max-md:flex-wrap">
      <div className="flex-auto text-xl font-bold leading-8 text-black">
        {tSearch("results_for")} &quot;{search}&quot;
      </div>
    </div>
  )
}

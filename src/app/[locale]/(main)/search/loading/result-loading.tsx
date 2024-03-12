import { useTranslations } from "next-intl"

type Props = {
  isLoading: boolean
  fieldData: any | null
}

export default function ResultLoading({ isLoading, fieldData }: Props) {
  const tSearch = useTranslations("SearchPage")

  return (
    <>
      {isLoading && <>{tSearch("loading")}</>}

      {!isLoading && !fieldData?.length && <>{tSearch("no_results")}</>}
    </>
  )
}

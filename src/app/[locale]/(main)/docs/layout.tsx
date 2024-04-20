import { Separator } from "@/components/ui/separator"
import DocSideBar from "./components/side-bar"
import { NextIntlClientProvider, useMessages } from "next-intl"
import { pick } from "lodash"

type Props = {
  children: React.ReactNode
  params: {
    locale: string
  }
}

const DocsLayout = ({ children, params: {locale} }: Props) => {
  const message = useMessages();
  return (
    <NextIntlClientProvider locale={locale} messages={pick(message, "Documentation")}>
      <div className="mt-[10vh] flex min-h-full justify-between">
        <div className="flex min-h-full">
          <DocSideBar className="h-full w-[18vw]" />
          <Separator orientation="vertical" className="my-4 h-[96%]" />
        </div>
        <div className="w-[80vw]">{children}</div>
      </div>
    </NextIntlClientProvider>
  )
}

export default DocsLayout

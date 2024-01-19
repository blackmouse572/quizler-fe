import { useTranslations } from "next-intl"

import { Input } from "@/components/ui/input"
export default function NotFound() {
  const t = useTranslations("NotFoundPage")
  return (
    <div className="flex h-screen w-screen flex-row items-center justify-center text-center">
      <div className="flex flex-col space-y-11">
        <h2 className="text-4xl font-extrabold">{t('title')}</h2>
        <p className="font-medium">
          {t('message')}
        </p>
        {/* <Link href="/">Return Home</Link> */}
        <Input placeholder={t('input.placeholder')} />
      </div>
    </div>
  )
}

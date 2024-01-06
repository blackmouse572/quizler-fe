'use client'
import { Button, ButtonProps } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

type Props = ButtonProps

export default function GoBackButtonClient({ className, ...props }: Props) {
    const t = useTranslations('Index')
    const router = useRouter();
    const goBack = () => router.back()
    return (
        <Button {...props} className={cn(className, 'absolute font-heading font-medium top-10 left-10')} onClick={goBack}>
            <Icons.SignatureArrow />
            {t('back')}
        </Button>
    )
}
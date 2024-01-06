import GoBackButtonClient from '@/components/go-back-btn/go-back-button'
import { ButtonProps } from '@/components/ui/button'
import { pick } from 'lodash'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

type Props = ButtonProps

export default async function GoBackButton(props: Props) {
    const m = await getMessages()
    return (
        <NextIntlClientProvider messages={pick(m, 'Index')}>
            <GoBackButtonClient {...props} />
        </NextIntlClientProvider>
    )
}
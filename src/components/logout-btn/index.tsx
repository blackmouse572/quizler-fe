import LogoutButtonClient from "@/components/logout-btn/logout-btn"
import { ButtonProps } from "@/components/ui/button"
import { pick } from "lodash"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"

type Props = ButtonProps

async function LogoutButton(props: Props) {
    const m = await getMessages()
    return (
        <NextIntlClientProvider messages={pick(m, 'Index')}><LogoutButtonClient {...props} /></NextIntlClientProvider>
    )
}

export default LogoutButton
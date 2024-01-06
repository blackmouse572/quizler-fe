'use client'
import logoutAction from '@/components/logout-btn/logout-action'
import { Button, ButtonProps } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

type Props = ButtonProps

function LogoutButtonClient({ }: Props) {
    const router = useRouter();

    function logout() {
        logoutAction().then(() => {
            router.refresh()
        })
    }

    return (
        <Button onClick={logout} color={'danger'}>Logout</Button>
    )
}

export default LogoutButtonClient
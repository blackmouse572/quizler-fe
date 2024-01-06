import Navbar from '@/components/nav-bar'
import { MAIN_NAVBAR_ITEMS } from '@/lib/config/navbar-config'
import React from 'react'

type Props = {
    children?: React.ReactNode
}

function MainLayout({ children }: Props) {
    return (
        <main className='relative min-h-screen'>
            <Navbar className="fixed left-1/2 top-0 -translate-x-1/2" items={MAIN_NAVBAR_ITEMS} />
            {children}
        </main>
    )
}

export default MainLayout
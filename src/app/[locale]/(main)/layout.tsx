import Navbar from '@/components/nav-bar'
import { MAIN_NAVBAR_ITEMS } from '@/lib/config/navbar-config'
import React from 'react'

type Props = {
    children?: React.ReactNode
}

function MainLayout({ children }: Props) {
    return (
        <main className='relative min-h-screen'>
            <Navbar className="fixed top-0 left-1/2 -translate-x-1/2" items={MAIN_NAVBAR_ITEMS} />
            {children}
        </main>
    )
}

export default MainLayout
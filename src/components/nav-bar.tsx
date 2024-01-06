"use client"

import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import React from "react"

import { AnimatedListItem } from "@/components/ui/animated-list-item"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { ListItem } from "@/components/ui/list-item"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

export type MainNavItem = {
    title: string
    href: string
    description?: string
    disabled?: boolean
}

type Props = {
    items?: MainNavItem[]
    children?: React.ReactNode
    className?: string
}

function Navbar({ className, children, items = [] }: Props) {
    const segment = useSelectedLayoutSegment()
    const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)

    return (
        <NavigationMenu
            className={cn(
                "container z-[100] mx-auto w-full justify-between py-4",
                className
            )}
        >
            <NavigationMenuLink asChild>
                <Link href="/" className="flex items-center rounded-sm p-1.5">
                    <Icons.Icon className="mr-2 h-6 w-6" />
                    <span className="font-bold">Quizler</span>
                </Link>
            </NavigationMenuLink>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 rounded-lg p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <Link
                                        className="from-muted/50 to-muted dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex h-full w-full select-none flex-col justify-end rounded-md bg-white p-6 no-underline outline-none transition-all duration-500 ease-in focus:shadow-md dark:bg-black"
                                        href="/"
                                    >
                                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white duration-500 ease-in-out [mask-image:linear-gradient(to_bottom_left,white_20%,transparent_30%)] dark:bg-black"></div>

                                        <div className="mb-2 mt-4 text-lg font-bold">Quizler</div>
                                        <p className="text-muted-foreground text-sm leading-tight">
                                            Learning with supafast methods
                                        </p>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                            <ListItem href="/docs" title="Introduction">
                                What is Quizler?
                            </ListItem>
                            <ListItem href="/docs/installation" title="Classroom">
                                What is classroom? How to create a classroom?
                            </ListItem>
                            <ListItem href="/docs/primitives/typography" title="A.I">
                                <span>What is A.I? How to use A.I in Quizler?</span>
                                <Badge size="sm" color="danger" className="mx-2 rounded-sm">
                                    Beta
                                </Badge>
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>How it works</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {items.map((item) => (
                                <AnimatedListItem key={item.title} title={item.title} href={item.href} />
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/docs" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Documentation
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuList className="space-x-2">
                <NavigationMenuItem asChild>
                    <Link href="signup">
                        <Button variant="default" color={"primary"}>
                            Sign up
                        </Button>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem asChild>
                    <Link href="login">
                        <Button
                            variant="default"
                            className="shadow-none hover:bg-slate-300"
                            color={"accent"}
                        >
                            Sign in
                        </Button>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default Navbar

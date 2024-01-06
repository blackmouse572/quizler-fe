import { IIconKeys, Icons } from "@/components/ui/icons"
import { NavigationMenuLink } from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import Link from "next/link"
import React from "react"

type AnimatedProps = React.ComponentPropsWithoutRef<"a"> & {
    icon?: IIconKeys
}

export const AnimatedListItem = React.forwardRef<
    React.ElementRef<'a'>,
    Omit<AnimatedProps, 'children'>
>(({ className, title, icon, ...props }, ref) => {
    const Icon = icon ? Icons[icon] : Icons.X
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    ref={ref}
                    className={cn(
                        "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground flex select-none items-center gap-3 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                        "group",
                        className
                    )}
                    href={props.href ?? "#"}
                    {...props}
                >
                    <div className="h-4 overflow-hidden">
                        <div className="flex translate-y-0 items-center gap-4 transition-transform duration-500 ease-out group-hover:-translate-y-8">
                            <Icon className="inline-block h-4 w-4" />
                        </div>
                        <div className="flex translate-y-8 items-center gap-4 text-emerald-500 transition-transform duration-300 ease-out group-hover:-translate-y-4">
                            <Icon className="inline-block h-4 w-4" />
                        </div>
                    </div>
                    <div className="text-sm font-[500] leading-none">{title}</div>
                </Link>
            </NavigationMenuLink>
        </li>
    )
})

AnimatedListItem.displayName = "AnimatedListItem"
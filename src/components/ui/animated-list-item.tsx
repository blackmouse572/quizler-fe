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
                        "flex select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground items-center gap-3",
                        "group",
                        className
                    )}
                    href={props.href ?? "#"}
                    {...props}
                >
                    <div className="h-4 overflow-hidden">
                        <div className="flex items-center gap-4 translate-y-0 group-hover:-translate-y-8 transition-transform ease-out duration-500">
                            <Icon className="inline-block w-4 h-4" />
                        </div>
                        <div className="flex items-center gap-4 translate-y-8 group-hover:-translate-y-4 transition-transform ease-out duration-300 text-emerald-500">
                            <Icon className="inline-block w-4 h-4" />
                        </div>
                    </div>
                    <div className="text-sm font-[500] leading-none">{title}</div>
                </Link>
            </NavigationMenuLink>
        </li>
    )
})

AnimatedListItem.displayName = "AnimatedListItem"
"use client"

import * as React from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter, usePathname } from "next/navigation"
import { capitalize } from "lodash"

type Props = {
  routes: {
    url: string
    name: string
  }[]
}

export function NavigationBar({ routes }: Props) {
  const router = useRouter()
  const pathName = usePathname()
  const defaultPath = capitalize(pathName.split("/").at(-1))

  const onClickTab = (route: string) => {
    router.push(route)
  }

  return (
    <Tabs defaultValue={defaultPath} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        {routes.map((route) => (
          <TabsTrigger
            key={route.url}
            value={route.name}
            onClick={(e) => onClickTab(route.url)}
          >
            {route.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

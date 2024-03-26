"use client"

import * as React from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"

type Props = {
  routes: {
    url: string
    name: string
  }[]
}

export function NavigationBar({ routes }: Props) {
  const router = useRouter();

  const onClickTab = (route: string) => {
    router.push(route)
  }


  return (
    <Tabs defaultValue={routes[0].name} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        {routes.map((route) => (
          <TabsTrigger key={route.url} value={route.name} onClick={e => onClickTab(route.url)}>
              {route.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

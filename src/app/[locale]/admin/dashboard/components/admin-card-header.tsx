"use client"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/ui/icons"
import Link from "next/link"

type Props = {
  title: string
  href: string
  total?: number
}

export function AdminCardHeader({ title, href, total }: Props) {
  return (
    <Link href={href} className="">
      <Card className="transition-colors hover:bg-accent">
        <CardHeader>
          <CardDescription className="flex items-center justify-between">
            <div>{title}</div>
            <Icons.ChevronRight />
          </CardDescription>
          <CardTitle className="text-3xl">{total}</CardTitle>
        </CardHeader>
      </Card>
    </Link>
  )
}

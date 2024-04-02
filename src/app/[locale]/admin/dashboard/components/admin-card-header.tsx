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
    <Card className="w-1/4">
      <CardHeader>
        <CardTitle>
          <Link
            className="flex justify-between gap-2.5 text-base leading-6"
            href={href}
          >
            <div>{title}</div>
            <div>
              <Icons.ChevronRight />
            </div>
          </Link>
        </CardTitle>
        <CardDescription>{total}</CardDescription>
      </CardHeader>
    </Card>
  )
}

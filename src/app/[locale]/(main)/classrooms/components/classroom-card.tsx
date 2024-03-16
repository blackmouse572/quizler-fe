import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import UserDisplay from "@/components/user-display"
import { Classroom } from "@/types"
import Link from "next/link"
import { useMemo } from "react"

type Props = {
  item: Classroom
  displayActions?: boolean
}

function ClassroomCard({ item, displayActions }: Props) {
  const renderAuthor = useMemo(() => {
    if (item.author == null) return null
    return <UserDisplay user={item.author} />
  }, [item])

  return (
    <Card key={item.id}>
      <Link href={`/classrooms/${item.id}`} className="cursor-pointer">
        <CardHeader className="cursor-pointer">
          <CardTitle>{item.classname}</CardTitle>
          <CardDescription>{item.studentNumber}</CardDescription>
        </CardHeader>
      </Link>
      <CardContent>{renderAuthor}</CardContent>
    </Card>
  )
}

export default ClassroomCard

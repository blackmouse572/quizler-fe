import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Droppable, DroppableProps } from "@hello-pangea/dnd"

type Props = {
  item: {
    id: number
    title: string
  }
  children?: React.ReactNode
  droppableId?: string
  className?: string
} & Omit<DroppableProps, "children" | "droppableId">

function Dropable({ item, children, droppableId, className, ...props }: Props) {
  return (
    <Droppable
      droppableId={droppableId ?? item.id.toString()}
      direction="horizontal"
      {...props}
    >
      {(provided, snapshot) => (
        <Card
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={cn(
            "bg-background",
            snapshot.isDraggingOver && "border-emerald-500",
            className
          )}
        >
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-lg font-bold">
            {provided.placeholder}
            {children}
          </CardContent>
        </Card>
      )}
    </Droppable>
  )
}

export default Dropable

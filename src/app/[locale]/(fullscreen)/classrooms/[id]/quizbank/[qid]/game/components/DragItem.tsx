import { Card, CardDescription, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Draggable, DraggableProps } from "@hello-pangea/dnd"
type Props = {
  item: {
    id: number
    answer: string
  }
  index: number
  className?: string
} & Omit<DraggableProps, "children" | "draggableId">

function DragItem({ item, index, className, ...props }: Props) {
  return (
    <Draggable
      key={item.id}
      draggableId={item.id.toString()}
      index={index}
      {...props}
    >
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            "bg-background transition-all",
            snapshot.isDragging && "shadow-lg",
            className
          )}
        >
          <CardHeader className="text-center">
            {item.answer}
            <CardDescription>{item.id}</CardDescription>
          </CardHeader>
        </Card>
      )}
    </Draggable>
  )
}

export default DragItem

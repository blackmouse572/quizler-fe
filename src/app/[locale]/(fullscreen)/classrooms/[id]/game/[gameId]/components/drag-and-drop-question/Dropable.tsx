import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Droppable, DroppableProps } from "@hello-pangea/dnd"

type Props = {
  item: {
    id: string
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
            "bg-background transition-all",
            snapshot.isDraggingOver && "border-emerald-500",
            className
          )}
        >
          <CardHeader>
            <CardTitle className="text-center">{item.title}</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-lg font-bold">
            {children}
          </CardContent>
        </Card>
      )}
    </Droppable>
  )
}

export default Dropable

"use client"
import DragItem from "@/app/[locale]/(fullscreen)/classrooms/[id]/game/[gameId]/components/drag-and-drop-question/DragItem"
import Dropable from "@/app/[locale]/(fullscreen)/classrooms/[id]/game/[gameId]/components/drag-and-drop-question/Dropable"
import { useProgress } from "@/app/[locale]/(fullscreen)/classrooms/[id]/game/[gameId]/components/useProgress"
import { useToast } from "@/components/ui/use-toast"
import { GameQuiz } from "@/types/game"
import { DragDropContext, OnDragEndResponder } from "@hello-pangea/dnd"
import { nanoid } from "nanoid"
import React, { useCallback, useEffect, useMemo } from "react"

type Props = {
  data: GameQuiz
  onSubmit: (answer: string[]) => void
}

function DndQuestion({ data, onSubmit }: Props) {
  const { current } = useProgress()
  const mod = useMemo(() => {
    const questions = data.questions.map((e, i) => ({
      id: nanoid(),
      question: e,
    }))
    const answers = data.answers.map((e, i) => ({
      id: nanoid(),
      answer: e,
    }))

    return { questions, answers }
  }, [data])
  const [pairs, setPairs] = React.useState<Record<string, string>>({})
  const [containerItems, setContainerItems] = React.useState(mod.answers)

  const { toast } = useToast()

  const onDragEnd = useCallback<OnDragEndResponder>(
    (e) => {
      if (!e.destination) return
      const answerId = e.draggableId
      const destinationId = e.destination.droppableId
      const sourceId = e.source.droppableId
      if (sourceId === destinationId) return
      // 1. Question to Question
      if (destinationId !== "0" && sourceId !== "0") {
        // Swap the items
        const newPairs = { ...pairs }
        newPairs[destinationId] = answerId
        newPairs[sourceId] = pairs[destinationId]
        setPairs(newPairs)
        return
      }

      // 2. Container to Question
      if (sourceId === "0") {
        // swap the items
        const newPairs = { ...pairs }
        const tempItem = pairs[destinationId]
        newPairs[destinationId] = answerId
        setPairs(newPairs)
        let newContainerItems = containerItems.filter(
          (item) => item.id !== answerId
        )
        if (tempItem !== undefined) {
          newContainerItems.push(mod.answers.find((e) => e.id === tempItem)!)
          setContainerItems(newContainerItems)
        } else {
          setContainerItems(newContainerItems)
        }

        return
      }

      // 3. Question to Container
      if (destinationId === "-1") {
        // Remove the item from the question
        const newPairs = { ...pairs }
        delete newPairs[parseInt(sourceId)]
        setPairs(newPairs)
        // Add the item to the container
        const newContainerItems = [...containerItems]
        newContainerItems.push(mod.answers[parseInt(answerId)])
        setContainerItems(newContainerItems)
        return
      }
      toast({
        title: "Invalid move",
        description: "You can't move items from one question to another",
      })
    },
    [containerItems, mod.answers, pairs, toast]
  )

  useEffect(() => {
    if (Object.keys(pairs).length === mod.questions.length) {
      const answers = mod.questions.map((e) => pairs[e.id])
      console.log(answers)
      onSubmit(answers)
    }
  }, [mod.questions, pairs, onSubmit])

  return (
    <DragDropContext onDragEnd={onDragEnd} enableDefaultSensors nonce="">
      <div className="grid grid-cols-3 gap-4">
        {mod.questions.map(({ id, question }, index) => {
          const item = mod.answers.find((e) => e.id === pairs[id])
          return (
            <Dropable
              mode="standard"
              item={{
                id,
                title: question,
              }}
              key={`${question}-${index}`}
            >
              {item && <DragItem item={item} index={1} />}
            </Dropable>
          )
        })}
      </div>
      <Dropable
        item={{
          id: "0",
          title: "",
        }}
        className="mt-16 border-none bg-transparent shadow-none"
      >
        <div className="grid grid-cols-3 gap-4">
          {containerItems.map((answer, index) => {
            return (
              <DragItem
                item={answer}
                key={`${answer}-${index}`}
                index={index}
              />
            )
          })}
        </div>
      </Dropable>
    </DragDropContext>
  )
}

export default DndQuestion

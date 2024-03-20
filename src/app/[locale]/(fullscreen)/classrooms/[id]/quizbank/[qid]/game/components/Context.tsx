"use client"
import DragItem from "@/app/[locale]/(fullscreen)/classrooms/[id]/quizbank/[qid]/game/components/DragItem"
import Dropable from "@/app/[locale]/(fullscreen)/classrooms/[id]/quizbank/[qid]/game/components/Dropable"
import { useToast } from "@/components/ui/use-toast"
import { DragDropContext, OnDragEndResponder } from "@hello-pangea/dnd"
import React, { useCallback } from "react"

type Props = {}
const DATA = {
  questions: [
    {
      questions: "What is the capital of France?",
      id: 0,
    },
    {
      questions: "What is the capital of Germany?",
      id: 1,
    },
    {
      questions: "What is the capital of Spain?",
      id: 2,
    },
  ],
  answers: [
    {
      answer: "Paris",
      id: 0,
    },
    {
      answer: "Berlin",
      id: 1,
    },
    {
      answer: "Madrid",
      id: 2,
    },
  ],
}

function Context({}: Props) {
  const [pairs, setPairs] = React.useState<Record<number, number>>({})
  const [containerItems, setContainerItems] = React.useState(DATA.answers)
  const { toast } = useToast()
  const onDragEnd = useCallback<OnDragEndResponder>(
    (e) => {
      if (!e.destination) return
      const answerId = e.draggableId
      const destinationId = e.destination.droppableId
      const sourceId = e.source.droppableId
      if (sourceId === destinationId) return

      // 1. Question to Question
      if (destinationId !== "-1" && sourceId !== "-1") {
        // Swap the items
        const newPairs = { ...pairs }
        newPairs[parseInt(destinationId)] = parseInt(answerId)
        newPairs[parseInt(sourceId)] = pairs[parseInt(destinationId)]
        setPairs(newPairs)
        return
      }

      // 2. Container to Question
      if (sourceId === "-1") {
        // swap the items
        const newPairs = { ...pairs }
        const tempItem = pairs[parseInt(destinationId)]
        newPairs[parseInt(destinationId)] = parseInt(answerId)
        setPairs(newPairs)
        let newContainerItems = containerItems.filter(
          (item) => item.id !== parseInt(answerId)
        )
        if (tempItem !== undefined) {
          newContainerItems.push(DATA.answers[tempItem])
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
        newContainerItems.push(DATA.answers[parseInt(answerId)])
        setContainerItems(newContainerItems)
        return
      }
      toast({
        title: "Invalid move",
        description: "You can't move items from one question to another",
      })
    },
    [containerItems, pairs, toast]
  )

  console.log(pairs)
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex justify-between gap-3">
        {DATA.questions.map(({ id, questions }, index) => {
          const item = DATA.answers[pairs[id]]
          return (
            <Dropable
              mode="standard"
              item={{
                id: index,
                title: questions,
              }}
              key={`${questions}-${index}`}
            >
              {item && <DragItem item={item} index={1} />}
            </Dropable>
          )
        })}
      </div>
      <Dropable
        item={{
          id: -1,
          title: "",
        }}
        className="mt-16"
      >
        <div className="flex flex-row gap-3">
          {containerItems.map((answer, index) => {
            return (
              <DragItem
                item={answer}
                key={`${answer}-${index}`}
                index={answer.id}
              />
            )
          })}
        </div>
      </Dropable>
    </DragDropContext>
  )
}

export default Context

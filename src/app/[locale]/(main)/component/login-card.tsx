"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { CardWithForm } from "@/components/ui/card"

export const LoginCard = () => {
  const [showCard, setShowCard] = useState<boolean>(false)

  const toggleCard = () => {
    setShowCard((prev) => !prev)
  }
  return (
    <>
      <Button
        onClick={() => toggleCard()}
        className="z-10"
        variant="default"
        color={"primary"}
      >
        {showCard ? "Close form" : "Show form"}
      </Button>
      {showCard && <CardWithForm className="z-10" />}
    </>
  )
}

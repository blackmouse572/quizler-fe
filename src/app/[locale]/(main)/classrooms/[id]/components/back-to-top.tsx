"use client"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { NamedToolTip } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"

export default function BackToTop() {
  const i18n = useTranslations("ClassroomDetails")
  const [isVisible, setIsVisible] = useState(false)
  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  return (
    <>
      {isVisible && (
        <div
          className={cn(
            "fixed bottom-0 right-0 z-20 -translate-x-1/2 -translate-y-1/2 rounded-md border border-input bg-background p-3 shadow-lg lg:bottom-0 lg:right-0 2xl:right-0"
          )}
        >
          <NamedToolTip side="top" content={i18n("navbar.back_to_top")}>
            <Button onClick={scrollToTop} isIconOnly>
              <Icons.ArrowUp className="h-4 w-4" />
            </Button>
          </NamedToolTip>
        </div>
      )}
    </>
  )
}

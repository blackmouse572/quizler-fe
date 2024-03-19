import React from "react"

type Props = {
  children: React.ReactNode
}

function ClassroomDetailLayout({ children }: Props) {
  return <main className="container mx-auto">{children}</main>
}

export default ClassroomDetailLayout

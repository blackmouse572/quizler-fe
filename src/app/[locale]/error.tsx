"use client"

import { Suspense, lazy } from "react"
import { TErrorPageProps } from "./ErrorComponent"

// Move error content to a separate chunk and load it only when needed
const ErroPageComp = lazy(() => import("./ErrorComponent"))

const ErrorPage = (props: Omit<TErrorPageProps, "type">) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* Use YourComponent and pass props */}
      <ErroPageComp {...props} type={"Error"} />
    </Suspense>
  )
}

export default ErrorPage

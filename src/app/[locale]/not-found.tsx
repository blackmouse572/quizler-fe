"use client"

import { Suspense, lazy } from "react"
import { TErrorPageProps } from "@/components/error-component"

const ErroPageComp = lazy(() => import("@/components/error-component"))

const ErrorPage = (props: Omit<TErrorPageProps, "type">) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErroPageComp {...props} type={"NotFound"} />
    </Suspense>
  )
}

export default ErrorPage

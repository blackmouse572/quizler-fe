"use client"

import { GoogleOAuthProvider } from "@react-oauth/google"
import React from "react"

type Props = React.PropsWithChildren<{}>

function GoogleProvider({ children }: Props) {
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
    >
      {children}
    </GoogleOAuthProvider>
  )
}

export default GoogleProvider

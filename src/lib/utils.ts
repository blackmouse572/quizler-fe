import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000"
const SERVER_URL = process.env.API_SERVER_URL || "http://localhost:5001"

export function getAbsoluteURL(uri: string) {
  const isEndWithSlash = URL.endsWith("/")
  const isStartWithSlash = uri.startsWith("/")

  if (isEndWithSlash && isStartWithSlash) {
    return URL + uri.slice(1)
  }

  if (!isEndWithSlash && !isStartWithSlash) {
    return `${URL}/${uri}`
  }
  return URL + uri
}

export function getAPIServerURL(uri: string) {
  const isEndWithSlash = SERVER_URL.endsWith("/")
  const isStartWithSlash = uri.startsWith("/")

  if (isEndWithSlash && isStartWithSlash) {
    return SERVER_URL + uri.slice(1)
  }

  if (!isEndWithSlash && !isStartWithSlash) {
    return `${SERVER_URL}/${uri}`
  }

  return SERVER_URL + uri
}

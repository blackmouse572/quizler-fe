import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const URL = process.env.SITE_URL || "http://localhost:3000"
export function getAbsoluteURL(uri: string) {
  const isEndWithSlash = URL.endsWith("/")
  const isStartWithSlash = uri.startsWith("/")

  if (isEndWithSlash && isStartWithSlash) {
    return URL + uri.slice(1)
  }

  if (!isEndWithSlash && !isStartWithSlash) {
    return `${URL}/${uri}`
  }
}

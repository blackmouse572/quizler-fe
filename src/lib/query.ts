export function toURLSeachParams(obj: any): URLSearchParams {
  const searchParams = new URLSearchParams()
  for (const key in obj) {
    searchParams.set(key, obj[key])
  }
  return searchParams
}

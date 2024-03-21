export function toURLSeachParams(obj: any): URLSearchParams {
  const searchParams = new URLSearchParams()
  for (const key in obj) {
    if (obj[key] === undefined) continue
    searchParams.set(key, obj[key])
  }
  return searchParams
}

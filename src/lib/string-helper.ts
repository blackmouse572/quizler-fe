export function getShortName(longName: string): string {
  // Split the name into words, handling mixed cases and extra spaces:
  const words =
    longName
      .trim()
      .toLowerCase()
      .match(/\b\w+\b/g) || []

  // Take the first letter of each word, handling cases with more than two words:
  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
}

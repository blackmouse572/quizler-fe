// Function to generate random colors without duplicates
export function generateRandomColors(count: number): string[] {
  const colors: string[] = []
  while (colors.length < count) {
    const randomColor: string = getRandomColor()
    if (!colors.includes(randomColor)) {
      colors.push(randomColor)
    }
  }
  return colors
}

// Function to generate a random color
export function getRandomColor(): string {
  const letters: string = "0123456789ABCDEF"
  let color: string = "#"
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

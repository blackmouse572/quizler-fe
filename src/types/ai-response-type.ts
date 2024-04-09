export type AIAnswer = {
  candidates: [
    {
      content: {
        parts: [
          {
            text: string
          },
        ]
      }
      finishReason: string
      index: 0
      safetyRatings: [
        {
          category: string
          probability: string
        },
        {
          category: string
          probability: string
        },
        {
          category: string
          probability: string
        },
        {
          category: string
          probability: string
        },
      ]
    },
  ]
  promptFeedback: {
    safetyRatings: [
      {
        category: string
        probability: string
      },
      {
        category: string
        probability: string
      },
      {
        category: string
        probability: string
      },
      {
        category: string
        probability: string
      },
    ]
  }
}

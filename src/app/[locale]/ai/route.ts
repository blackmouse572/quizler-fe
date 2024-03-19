import { StreamingTextResponse } from "ai"
import OpenAI from "openai"
import { z } from "zod"

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// IMPORTANT! Set the runtime to edge
export const runtime = "edge"

const chunkSize = 2 // Adjust chunk size based on your needs

const BodySchema = z.object({
  messages: z.string(),
  options: z.enum(["shorten", "rephase", "summary", "countinue"]),
})

export async function POST(req: Request) {
  //   const { messages, options } = BodySchema.parse(await req.json())

  // Ask OpenAI for a streaming chat completion given the prompt
  //   const response = await openai.completions.create({
  //     model: "text-davinci-003",
  //     prompt: messages,
  //     max_tokens: 150,
  //     n: 1,
  //     stop: ["\n"],
  //     presence_penalty: 0.6,
  //   })

  const response = {
    choices: [
      {
        finish_reason: "length",
        index: 0,
        logprobs: null,
        text: "I'm sorry, I don't understand. Can you rephrase? There are many ways to say the same thing. I can help you with that. Options are: shorten, rephrase, summary, countinue. Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus saepe perferendis provident. Consequuntur maxime velit porro at, tempore consectetur quibusdam quae veniam perferendis, est, rerum iusto molestiae a sequi id!Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus saepe perferendis provident. Consequuntur maxime velit porro at, tempore consectetur quibusdam quae veniam perferendis, est, rerum iusto molestiae a sequi id!Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus saepe perferendis provident. Consequuntur maxime velit porro at, tempore consectetur quibusdam quae veniam perferendis, est, rerum iusto molestiae a sequi id!Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus saepe perferendis provident. Consequuntur maxime velit porro at, tempore consectetur quibusdam quae veniam perferendis, est, rerum iusto molestiae a sequi id!Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus saepe perferendis provident. Consequuntur maxime velit porro at, tempore consectetur quibusdam quae veniam perferendis, est, rerum iusto molestiae a sequi id!Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus saepe perferendis provident. Consequuntur maxime velit porro at, tempore consectetur quibusdam quae veniam perferendis, est, rerum iusto molestiae a sequi id!Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus saepe perferendis provident. Consequuntur maxime velit porro at, tempore consectetur quibusdam quae veniam perferendis, est, rerum iusto molestiae a sequi id!Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus saepe perferendis provident. Consequuntur maxime velit porro at, tempore consectetur quibusdam quae veniam perferendis, est, rerum iusto molestiae a sequi id!Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus saepe perferendis provident. Consequuntur maxime velit porro at, tempore consectetur quibusdam quae veniam perferendis, est, rerum iusto molestiae a sequi id!Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus saepe perferendis provident. Consequuntur maxime velit porro at, tempore consectetur quibusdam quae veniam perferendis, est, rerum iusto molestiae a sequi id!Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus saepe perferendis provident. Consequuntur maxime velit porro at, tempore consectetur quibusdam quae veniam perferendis, est, rerum iusto molestiae a sequi id!Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus saepe perferendis provident. Consequuntur maxime velit porro at, tempore consectetur quibusdam quae veniam perferendis, est, rerum iusto molestiae a sequi id!Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus saepe perferendis provident. Consequuntur maxime velit porro at, tempore consectetur quibusdam quae veniam perferendis, est, rerum iusto molestiae a sequi id!Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus saepe perferendis provident. Consequuntur maxime velit porro at, tempore consectetur quibusdam quae veniam perferendis, est, rerum iusto molestiae a sequi id!Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus saepe perferendis provident. Consequuntur maxime velit porro at, tempore consectetur quibusdam quae veniam perferendis, est, rerum iusto molestiae a sequi id!Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus saepe perferendis provident. Consequuntur maxime velit porro at, tempore consectetur quibusdam quae veniam perferendis, est, rerum iusto molestiae a sequi id!Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus saepe perferendis provident. Consequuntur maxime velit porro at, tempore consectetur quibusdam quae veniam perferendis, est, rerum iusto molestiae a sequi id!Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus saepe perferendis provident. Consequuntur maxime velit porro at, tempore consectetur quibusdam quae veniam perferendis, est, rerum iusto molestiae a sequi id! ",
      },
    ],
  }

  // fake a stream
  const result = response.choices[0].text

  const chunks: string[] = []
  for (let i = 0; i < result.length; i += chunkSize) {
    chunks.push(result.slice(i, i + chunkSize))
  }
  const stream = new ReadableStream({
    start(controller) {
      let index = 0
      const interval = setInterval(() => {
        if (index < chunks.length) {
          controller.enqueue(chunks[index])
          index++
        } else {
          controller.close()
          clearInterval(interval)
        }
      }, 1000)
    },
  })

  // Respond with the stream
  return new StreamingTextResponse(stream)
}

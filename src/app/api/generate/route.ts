import Anthropic from "@anthropic-ai/sdk"
import { AnthropicStream, Message, StreamingTextResponse } from "ai"

const genAI = new Anthropic({
  apiKey: process.env.GOOGLE_API_KEY || "",
})

// IMPORTANT! Set the runtime to edge
export const runtime = "edge"

// convert messages from the Vercel AI SDK Format to the format
// that is expected by the Google GenAI SDK
const buildGoogleGenAIPrompt = (messages: Message[]) => ({
  contents: messages
    .filter(
      (message) => message.role === "user" || message.role === "assistant"
    )
    .map((message) => ({
      role: message.role === "user" ? "user" : "model",
      parts: [{ text: message.content }],
    })),
})

const structuredPrompt = (
  prompt: string,
  itemSeperator: string,
  quizSeperator: string
) => {
  return `Genereate a set of 10 flashcards from the following text.  Term and definition are separated by a ${itemSeperator}. Each flashcard is separated by a ${quizSeperator}.\nFor example:"""An apple${itemSeperator} A fruit${quizSeperator} A bird${itemSeperator} An animal${quizSeperator}A flower${itemSeperator}a plant${quizSeperator}""".\nDo not format or list the answer. Also Do not provide any furthur information but you are welcome to take the context from the text."""\nHere is the text: \n"""${prompt}"""i. \nIf answer larger or equal to 11, reduce it down to 10 items only.`
}

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt, itemSeperator, quizSeperator } = await req.json()

  const _prompt = structuredPrompt(prompt, itemSeperator, quizSeperator)
  //   const message =
  const geminiStream = await genAI.messages.create({
    messages: [
      {
        role: "user",
        content: _prompt,
      },
    ],
    model: "claude-3-haiku-20240307",
    stream: true,
    max_tokens: 300,
  })

  // Convert the response into a friendly text-stream
  const stream = AnthropicStream(geminiStream)

  // Respond with the stream
  return new StreamingTextResponse(stream)
}

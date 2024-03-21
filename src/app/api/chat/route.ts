import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/client";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { getServerSession } from "next-auth";
import OpenAI from "openai";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Set the runtime to edge for best performance

export async function POST(req: Request) {
  const { messages } = await req.json();

  if (messages.length == 1) {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }
    const user = await prisma.user.findUnique({
      where: { id: session.user.dbId },
      include: {
        goals: true,
      },
    });

    if (user) {
      messages.unshift({
        role: "user",
        content: user.goals.length
          ? `I have ${
              user.goals.length
            } goals. Please help me accomplish them, by giving me valuable hints! ${user.goals
              .map((g) => g.title)
              .join(", ")}`
          : "I don't have any goals",
      });
      messages.unshift({
        role: "system",
        content:
          "You are a personal coach you help balblabl and identify issus and recommend professional help.",
      });
    }
  }

  console.log(messages);
  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}

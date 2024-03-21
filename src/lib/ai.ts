import OpenAI from "openai";

const openai = new OpenAI();

export async function translateMessage(message: string, language: string) {
  let result = JSON.parse(
    (
      await openai.chat.completions.create(
        {
          messages: [
            {
              role: "user",
              content:
                "Please translate this message for me to " +
                language +
                " please: " +
                message,
            },
          ],
          model: "gpt-3.5-turbo-1106",

          functions: [
            {
              name: "translate_message",
              parameters: {
                type: "object",
                properties: {
                  translation: {
                    type: "string",
                    description: "This is the translation of the message",
                  },
                },
                required: ["translation"],
              },
            },
          ],
          function_call: { name: "translate_message" },
        },
        { timeout: 10000 }
      )
    ).choices[0].message.function_call?.arguments as any
  ).translation as any;

  console.log("result", result);
  return result;
}

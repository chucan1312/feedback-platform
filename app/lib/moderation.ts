import { openai } from "@/app/lib/openai";

export async function moderateText(text: string) {
  const result = await openai.moderations.create({
    model: "omni-moderation-latest",
    input: text,
  });

  return result.results[0];
}
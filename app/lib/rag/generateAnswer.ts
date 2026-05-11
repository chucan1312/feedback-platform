import { openai } from "../openai";

type GenerateAnswerParams = {
    question: string;
    context: string;
};

export async function generateAnswer({
    question,
    context,
}: GenerateAnswerParams) {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: `
    You are an AI feedback assistant.

    Answer using only the provided survey responses.
    Do not invent information.
    If there is not enough information, say so.
    Keep answers concise and actionable.
        `,
            },
            {
                role: "user",
                content: `
Question:
${question}

Relevant survey responses:
${context}
        `,
            },
        ],
    });

    return completion.choices[0]?.message?.content || "";
}